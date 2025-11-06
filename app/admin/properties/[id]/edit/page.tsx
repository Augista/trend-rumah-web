"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft } from "lucide-react"

const districts = ["Darmo", "Dinoyo", "Tegalsari", "Jambangan", "Wonokromo", "Sukolilo", "Tambaksari", "Genteng"]

const propertyTypes = ["Rumah", "Apartemen", "Ruko", "Tanah"]

export default function EditPropertyPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [imagePreview, setImagePreview] = useState<string>("")
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    district: "",
    property_type: "",
    price: "",
    size_sqm: "",
    bedrooms: "",
    bathrooms: "",
    featured_image_url: "",
    amenities: "",
    contact_phone: "",
    contact_email: "",
  })

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetch(`/api/properties/${params.id}`)
        if (!response.ok) throw new Error("Failed to fetch")
        const property = await response.json()

        setFormData({
          title: property.title || "",
          description: property.description || "",
          location: property.location || "",
          district: property.district || "",
          property_type: property.property_type || "",
          price: property.price?.toString() || "",
          size_sqm: property.size_sqm?.toString() || "",
          bedrooms: property.bedrooms?.toString() || "",
          bathrooms: property.bathrooms?.toString() || "",
          featured_image_url: property.featured_image_url || "",
          amenities: Array.isArray(property.amenities) ? property.amenities.join(", ") : property.amenities || "",
          contact_phone: property.contact_phone || "",
          contact_email: property.contact_email || "",
        })

        if (property.featured_image_url) {
          setImagePreview(property.featured_image_url)
        }
      } catch (error) {
        console.error("[v0] Fetch error:", error)
      } finally {
        setFetching(false)
      }
    }

    fetchProperty()
  }, [params.id])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string
        setImagePreview(imageUrl)
        setFormData((prev) => ({
          ...prev,
          featured_image_url: imageUrl,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch(`/api/properties/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          price: Number.parseInt(formData.price),
          size_sqm: formData.size_sqm ? Number.parseInt(formData.size_sqm) : null,
          bedrooms: formData.bedrooms ? Number.parseInt(formData.bedrooms) : null,
          bathrooms: formData.bathrooms ? Number.parseInt(formData.bathrooms) : null,
          amenities: formData.amenities
            .split(",")
            .map((a) => a.trim())
            .filter(Boolean),
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to update property")
      }

      router.push("/admin/dashboard")
    } catch (error) {
      console.error("[v0] Submit error:", error)
      alert("Gagal update properti")
    } finally {
      setLoading(false)
    }
  }

  if (fetching) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/admin/dashboard" className="inline-flex items-center gap-2 mb-4 hover:opacity-80">
            <ArrowLeft className="w-4 h-4" />
            Kembali
          </Link>
          <h1 className="text-3xl font-serif font-bold">Edit Properti</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Image Upload */}
          <div className="bg-card rounded-lg p-6 border border-border">
            <h2 className="text-lg font-semibold mb-4">Foto Utama</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-center w-full">
                <label className="w-full border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors">
                  <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                  {imagePreview ? (
                    <div>
                      <img
                        src={imagePreview || "/placeholder.svg"}
                        alt="Preview"
                        className="h-48 mx-auto rounded-lg mb-4"
                      />
                      <p className="text-sm text-muted-foreground">Klik untuk mengganti foto</p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-lg font-medium text-foreground mb-2">Upload Foto Properti</p>
                      <p className="text-sm text-muted-foreground">Drag and drop atau klik untuk pilih</p>
                    </div>
                  )}
                </label>
              </div>
            </div>
          </div>

          {/* Basic Information */}
          <div className="bg-card rounded-lg p-6 border border-border space-y-4">
            <h2 className="text-lg font-semibold mb-4">Informasi Dasar</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Judul Properti *</label>
                <Input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Rumah Mewah Darmo"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Tipe Properti *</label>
                <select
                  name="property_type"
                  value={formData.property_type}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-input rounded-md bg-background text-foreground"
                  required
                >
                  <option value="">Pilih tipe properti</option>
                  {propertyTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Harga (Rp) *</label>
                <Input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="2500000000"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Luas (m²)</label>
                <Input
                  type="number"
                  name="size_sqm"
                  value={formData.size_sqm}
                  onChange={handleInputChange}
                  placeholder="250"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Kamar Tidur</label>
                <Input
                  type="number"
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleInputChange}
                  placeholder="4"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Kamar Mandi</label>
                <Input
                  type="number"
                  name="bathrooms"
                  value={formData.bathrooms}
                  onChange={handleInputChange}
                  placeholder="3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Lokasi *</label>
                <Input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Jl. Darmo Indah"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Kelurahan/Kecamatan *</label>
                <select
                  name="district"
                  value={formData.district}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-input rounded-md bg-background text-foreground"
                  required
                >
                  <option value="">Pilih kelurahan</option>
                  {districts.map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Deskripsi Properti</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Deskripsi lengkap tentang properti..."
                rows={5}
                className="w-full px-4 py-2 border border-input rounded-md bg-background text-foreground"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Fasilitas (pisahkan dengan koma)</label>
              <Input
                type="text"
                name="amenities"
                value={formData.amenities}
                onChange={handleInputChange}
                placeholder="Kolam Renang, Taman, Garasi, Dapur Modern"
              />
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-card rounded-lg p-6 border border-border space-y-4">
            <h2 className="text-lg font-semibold mb-4">Kontak</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Nomor Telepon</label>
                <Input
                  type="tel"
                  name="contact_phone"
                  value={formData.contact_phone}
                  onChange={handleInputChange}
                  placeholder="+62 812 3456 7890"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                <Input
                  type="email"
                  name="contact_email"
                  value={formData.contact_email}
                  onChange={handleInputChange}
                  placeholder="anto@kuswantoproperty.com"
                />
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4">
            <Link href="/admin/dashboard" className="flex-1">
              <Button variant="outline" className="w-full bg-transparent">
                Batal
              </Button>
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-accent transition-colors font-medium disabled:opacity-50"
            >
              {loading ? "Menyimpan..." : "Update Properti"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
