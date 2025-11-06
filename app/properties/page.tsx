"use client"

import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { ChevronRight, MapPin } from "lucide-react"
import Link from "next/link"

const properties = [
  {
    id: 1,
    title: "Rumah Modern Darmo",
    location: "Darmo",
    price: "Rp 2.5M",
    type: "Rumah",
    size: "250 m²",
    image: "/modern-house.png",
  },
  {
    id: 2,
    title: "Rumah Nyaman Dinoyo",
    location: "Dinoyo",
    price: "Rp 1.2M",
    type: "Rumah",
    size: "180 m²",
    image: "/comfortable-home.jpg",
  },
  {
    id: 3,
    title: "Apartemen Pusat Kota",
    location: "Jambangan",
    price: "Rp 800 JT",
    type: "Apartemen",
    size: "120 m²",
    image: "/modern-city-apartment.png",
  },
  {
    id: 4,
    title: "Ruko Soekarno-Hatta",
    location: "Tegalsari",
    price: "Rp 1.2M",
    type: "Ruko",
    size: "180 m²",
    image: "/traditional-shophouse.png",
  },
  {
    id: 5,
    title: "Rumah Mewah Ketintang",
    location: "Genteng",
    price: "Rp 3M",
    type: "Rumah",
    size: "300 m²",
    image: "/luxury-home.png",
  },
  {
    id: 6,
    title: "Ruko Bisnis Tanjungsari",
    location: "Tegalsari",
    price: "Rp 950 JT",
    type: "Ruko",
    size: "150 m²",
    image: "/business-shop.jpg",
  },
  {
    id: 7,
    title: "Apartemen Modern Surabaya",
    location: "Bulak",
    price: "Rp 600 JT",
    type: "Apartemen",
    size: "100 m²",
    image: "/modern-apartment-living.png",
  },
  {
    id: 8,
    title: "Rumah Asri Gubeng",
    location: "Gubeng",
    price: "Rp 1.5M",
    type: "Rumah",
    size: "200 m²",
    image: "/nice-home.jpg",
  },
]

export default function PropertiesPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Page Header */}
      <section className="bg-muted py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">Semua Properti</h1>
          <p className="text-muted-foreground">Jelajahi koleksi lengkap properti kami di Surabaya</p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {properties.map((property) => (
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
                  <h3 className="text-base font-semibold mb-2 text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {property.title}
                  </h3>
                  <div className="flex items-center text-muted-foreground text-sm mb-3">
                    <MapPin className="w-4 h-4 mr-1 shrink-0" />
                    <span className="truncate">{property.location}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-4 pb-4 border-b border-border text-sm">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Harga</p>
                      <p className="font-bold text-primary text-sm">{property.price}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Luas</p>
                      <p className="font-bold text-foreground text-sm">{property.size}</p>
                    </div>
                  </div>

                  <Link
                    href={`/properties/${property.id}`}
                    className="flex items-center justify-center gap-2 w-full py-2 bg-muted hover:bg-primary hover:text-primary-foreground text-foreground rounded-lg transition-colors font-medium text-xs"
                  >
                    Detail
                    <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
