"use client"

import { useState, useMemo } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { ChevronRight, MapPin } from "lucide-react"
import Link from "next/link"

// Mock data for properties
const allProperties = [
  {
    id: 1,
    title: "Rumah Modern Darmo",
    location: "Darmo",
    district: "Darmo",
    price: 2500000000,
    type: "Rumah",
    size: 250,
    image: "/modern-house.png",
  },
  {
    id: 2,
    title: "Rumah Nyaman Dinoyo",
    location: "Dinoyo",
    district: "Dinoyo",
    price: 1200000000,
    type: "Rumah",
    size: 180,
    image: "/comfortable-home.jpg",
  },
  {
    id: 3,
    title: "Apartemen Pusat Kota",
    location: "Jambangan",
    district: "Jambangan",
    price: 800000000,
    type: "Apartemen",
    size: 120,
    image: "/modern-city-apartment.png",
  },
  {
    id: 4,
    title: "Ruko Soekarno-Hatta",
    location: "Tegalsari",
    district: "Tegalsari",
    price: 1200000000,
    type: "Ruko",
    size: 180,
    image: "/traditional-shophouse.png",
  },
  {
    id: 5,
    title: "Rumah Mewah Ketintang",
    location: "Ketintang",
    district: "Genteng",
    price: 3000000000,
    type: "Rumah",
    size: 300,
    image: "/luxury-home.png",
  },
  {
    id: 6,
    title: "Ruko Bisnis Tanjungsari",
    location: "Tanjungsari",
    district: "Tegalsari",
    price: 950000000,
    type: "Ruko",
    size: 150,
    image: "/business-shop.jpg",
  },
  {
    id: 7,
    title: "Apartemen Modern Surabaya",
    location: "Bulak",
    district: "Bulak",
    price: 600000000,
    type: "Apartemen",
    size: 100,
    image: "/modern-apartment-living.png",
  },
  {
    id: 8,
    title: "Rumah Asri Gubeng",
    location: "Gubeng",
    district: "Gubeng",
    price: 1500000000,
    type: "Rumah",
    size: 200,
    image: "/nice-home.jpg",
  },
]

const districts = ["Darmo", "Dinoyo", "Jambangan", "Tegalsari", "Genteng", "Bulak", "Gubeng"]
const propertyTypes = ["Rumah", "Apartemen", "Ruko"]

export default function SearchPage() {
  const [filters, setFilters] = useState({
    district: "",
    type: "",
    minSize: "",
    maxSize: "",
    minPrice: "",
    maxPrice: "",
  })

  const filteredProperties = useMemo(() => {
    return allProperties.filter((prop) => {
      if (filters.district && prop.district !== filters.district) return false
      if (filters.type && prop.type !== filters.type) return false
      if (filters.minSize && prop.size < Number.parseInt(filters.minSize)) return false
      if (filters.maxSize && prop.size > Number.parseInt(filters.maxSize)) return false
      if (filters.minPrice && prop.price < Number.parseInt(filters.minPrice)) return false
      if (filters.maxPrice && prop.price > Number.parseInt(filters.maxPrice)) return false
      return true
    })
  }, [filters])

  const handleFilterChange = (field: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const formatPrice = (price: number) => {
    if (price >= 1000000000) {
      return `Rp ${(price / 1000000000).toFixed(1)} M`
    }
    return `Rp ${(price / 1000000).toFixed(0)} JT`
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Page Header */}
      <section className="bg-muted py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">Cari Properti</h1>
          <p className="text-muted-foreground">Temukan properti impian dengan filter lengkap kami</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-lg p-6 sticky top-4">
              <h2 className="text-lg font-semibold mb-6">Filter Pencarian</h2>

              {/* District Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Daerah/Kecamatan</label>
                <select
                  value={filters.district}
                  onChange={(e) => handleFilterChange("district", e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Semua Daerah</option>
                  {districts.map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
              </div>

              {/* Property Type Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Jenis Properti</label>
                <select
                  value={filters.type}
                  onChange={(e) => handleFilterChange("type", e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Semua Jenis</option>
                  {propertyTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Size Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Ukuran (m²)</label>
                <div className="space-y-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.minSize}
                    onChange={(e) => handleFilterChange("minSize", e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.maxSize}
                    onChange={(e) => handleFilterChange("maxSize", e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              {/* Price Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Harga (Rp)</label>
                <div className="space-y-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.minPrice}
                    onChange={(e) => handleFilterChange("minPrice", e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.maxPrice}
                    onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              {/* Reset Button */}
              <button
                onClick={() =>
                  setFilters({ district: "", type: "", minSize: "", maxSize: "", minPrice: "", maxPrice: "" })
                }
                className="w-full py-2 bg-muted hover:bg-secondary text-foreground rounded-lg transition-colors text-sm font-medium"
              >
                Reset Filter
              </button>
            </div>
          </div>

          {/* Properties Grid */}
          <div className="lg:col-span-3">
            <div className="mb-6 flex justify-between items-center">
              <p className="text-muted-foreground text-sm">
                Menampilkan <span className="font-semibold text-foreground">{filteredProperties.length}</span> properti
              </p>
            </div>

            {filteredProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredProperties.map((property) => (
                  <div
                    key={property.id}
                    className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 group"
                  >
                    <div className="relative h-48 overflow-hidden bg-muted">
                      <img
                        src={property.image || "/placeholder.svg"}
                        alt={property.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-3 right-3 bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-semibold">
                        {property.type}
                      </span>
                    </div>

                    <div className="p-4">
                      <h3 className="text-lg font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                        {property.title}
                      </h3>
                      <div className="flex items-center text-muted-foreground text-sm mb-3">
                        <MapPin className="w-4 h-4 mr-1" />
                        {property.location}
                      </div>

                      <div className="grid grid-cols-3 gap-3 mb-4 pb-4 border-b border-border text-sm">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Harga</p>
                          <p className="font-bold text-primary">{formatPrice(property.price)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Luas</p>
                          <p className="font-bold text-foreground">{property.size} m²</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Tipe</p>
                          <p className="font-bold text-foreground">{property.type}</p>
                        </div>
                      </div>

                      <Link
                        href={`/properties/${property.id}`}
                        className="flex items-center justify-center gap-2 w-full py-2 bg-muted hover:bg-primary hover:text-primary-foreground text-foreground rounded-lg transition-colors font-medium text-sm"
                      >
                        Detail
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg mb-4">Tidak ada properti yang sesuai dengan filter Anda</p>
                <button
                  onClick={() =>
                    setFilters({ district: "", type: "", minSize: "", maxSize: "", minPrice: "", maxPrice: "" })
                  }
                  className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-accent transition-colors font-medium text-sm"
                >
                  Reset Filter
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
