"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { X, MapPin, Home, Maximize2, DollarSign, Phone, Mail } from "lucide-react"
import Link from "next/link"

interface Property {
  id: string
  title: string
  price: number
  location: string
  district: string
  property_type: string
  size_sqm?: number
  bedrooms?: number
  bathrooms?: number
  description?: string
  featured_image_url?: string
  gallery_images?: string[]
  amenities?: string[]
  contact_phone?: string
  contact_email?: string
}

export default function PropertyDetailPage() {
  const { id } = useParams()
  const [property, setProperty] = useState<Property | null>(null)
  const [loading, setLoading] = useState(true)

  // 🧩 tambahan state untuk galeri
  const [activeImage, setActiveImage] = useState(0)
  const [showGallery, setShowGallery] = useState(false)

  useEffect(() => {
    if (!id) return

    async function fetchProperty() {
      try {
        const res = await fetch(`/api/properties/${id}`)
        const data = await res.json()
        setProperty(data)
      } catch (err) {
        console.error("Error fetching property:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchProperty()
  }, [id])

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center text-muted-foreground">
        <p>Memuat detail properti...</p>
      </main>
    )
  }

  if (!property) {
    return (
      <main className="min-h-screen flex items-center justify-center text-muted-foreground">
        <p>Properti tidak ditemukan.</p>
      </main>
    )
  }

  // 📸 gabungan antara featured image & gallery
  const images =
    property.gallery_images?.length && property.gallery_images[0]
      ? property.gallery_images
      : [property.featured_image_url || "/placeholder.svg"]

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero / Gambar utama */}
      <section className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="w-full">
          <img
            src={images[activeImage]}
            alt={property.title}
            className="w-full h-[300px] md:h-[400px] object-cover rounded-xl shadow-md"
          />
        </div>

        {/* Thumbnails */}
        <div className="flex flex-row mt-4 gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {images.slice(0, 5).map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Foto ${idx + 1}`}
              className={`w-24 h-24 object-cover rounded-lg border cursor-pointer transition-all ${
                activeImage === idx ? "ring-2 ring-primary" : "opacity-90 hover:opacity-100"
              }`}
              onClick={() => setActiveImage(idx)}
            />
          ))}

          {images.length > 5 && (
            <div
              className="relative w-24 h-24 rounded-lg overflow-hidden cursor-pointer flex-shrink-0"
              onClick={() => setShowGallery(true)}
            >
              <img src={images[5]} alt="Lihat Semua" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-semibold text-sm">
                +{images.length - 5} Foto
              </div>
            </div>
          )}
        </div>

        {/* Modal Gallery */}
        {showGallery && (
          <div className="fixed inset-0 bg-black/80 z-50 flex flex-col items-center justify-center">
            <button
              onClick={() => setShowGallery(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-300"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="max-w-5xl w-full px-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Foto ${idx + 1}`}
                    className="w-full h-56 object-cover rounded-lg border hover:opacity-80 cursor-pointer"
                    onClick={() => {
                      setActiveImage(idx)
                      setShowGallery(false)
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Detail Properti */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h1 className="text-4xl font-serif font-bold mb-3">{property.title}</h1>
              <div className="text-lg text-primary font-bold mb-4">
                Rp {property.price?.toLocaleString("id-ID")}
              </div>
              <div className="flex items-center text-muted-foreground text-lg mb-6">
                <MapPin className="w-5 h-5 mr-2" />
                {property.location}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8 pb-8 border-b border-border">
              <div className="text-center">
                <Home className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-sm text-muted-foreground mb-1">Kamar Tidur</p>
                <p className="text-2xl font-bold">{property.bedrooms ?? "-"}</p>
              </div>
              <div className="text-center">
                <Maximize2 className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-sm text-muted-foreground mb-1">Luas Tanah</p>
                <p className="text-2xl font-bold">{property.size_sqm ?? "-"} m²</p>
              </div>
              <div className="text-center">
                <DollarSign className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-sm text-muted-foreground mb-1">Kamar Mandi</p>
                <p className="text-2xl font-bold">{property.bathrooms ?? "-"}</p>
              </div>
            </div>

            {property.description && (
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Deskripsi</h2>
                <p className="text-muted-foreground leading-relaxed">{property.description}</p>
              </div>
            )}

            {property.amenities?.length ? (
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Fasilitas</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {property.amenities.map((a, i) => (
                    <div key={i} className="flex items-center text-foreground">
                      <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center mr-3">
                        <span className="text-primary-foreground text-xs font-bold">✓</span>
                      </div>
                      {a}
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          {/* Sidebar Kontak */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-lg p-6 sticky top-4">
              <h3 className="text-xl font-semibold mb-6">Hubungi Kami</h3>
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Whatsapp</p>
                    <p className="font-semibold text-foreground">
                      {property.contact_phone || "+6281235749112"}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Email</p>
                    <p className="font-semibold text-foreground">
                      {property.contact_email || "admin@kuswantoproperty.com"}
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() =>
                  window.open(
                    `https://wa.me/${(property.contact_phone || "6281235749112")
                      .replace(/[^0-9]/g, "")}?text=Halo%20saya%20tertarik%20dengan%20${encodeURIComponent(
                      property.title
                    )}`,
                    "_blank"
                  )
                }
                className="w-full py-3 bg-primary text-primary-foreground rounded-lg hover:bg-accent transition-colors font-semibold mb-3"
              >
                Hubungi Agen
              </button>

              <Link
                href="/properties"
                className="block text-center text-primary hover:text-accent text-sm font-medium"
              >
                ← Kembali ke Properti
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
