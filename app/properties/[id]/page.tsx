"use client"

import { useParams } from "next/navigation"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { MapPin, Home, Maximize2, DollarSign, Phone, Mail } from "lucide-react"
import Link from "next/link"

const propertyDetails: Record<number, any> = {
  1: {
    title: "Rumah Modern Darmo",
    price: "Rp 2.500.000.000",
    location: "Darmo, Surabaya",
    type: "Rumah",
    size: 250,
    bedrooms: 4,
    bathrooms: 3,
    image: "/modern-luxury-home.jpg",
    description:
      "Rumah mewah dengan design modern minimalis, dilengkapi fasilitas premium dan lokasi strategis di pusat bisnis Surabaya.",
    features: ["Taman luas", "Garasi 2 mobil", "Kolam renang", "Ruang tamu luas", "Dapur modern", "Smart home system"],
  },
  2: {
    title: "Rumah Nyaman Dinoyo",
    price: "Rp 1.200.000.000",
    location: "Dinoyo, Surabaya",
    type: "Rumah",
    size: 180,
    bedrooms: 3,
    bathrooms: 2,
    image: "/comfortable-family-home.jpg",
    description: "Rumah nyaman untuk keluarga dengan akses mudah ke sekolah, rumah sakit, dan pusat perbelanjaan.",
    features: ["Taman depan", "Garasi 1 mobil", "Dapur tertutup", "Ruang keluarga luas", "Lokasi tenang"],
  },
}

export default function PropertyDetailPage() {
  const params = useParams()
  const propertyId = Number.parseInt(params.id as string)
  const property = propertyDetails[propertyId] || propertyDetails[1]

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Image */}
      <section className="relative h-96 overflow-hidden">
        <img src={property.image || "/placeholder.svg"} alt={property.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/30"></div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-serif font-bold mb-3">{property.title}</h1>
              <div className="flex items-center text-lg text-primary font-bold mb-4">{property.price}</div>
              <div className="flex items-center text-muted-foreground text-lg mb-6">
                <MapPin className="w-5 h-5 mr-2" />
                {property.location}
              </div>
            </div>

            {/* Key Info */}
            <div className="grid grid-cols-3 gap-4 mb-8 pb-8 border-b border-border">
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mx-auto mb-2">
                  <Home className="w-6 h-6 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground mb-1">Kamar Tidur</p>
                <p className="text-2xl font-bold text-foreground">{property.bedrooms}</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mx-auto mb-2">
                  <Maximize2 className="w-6 h-6 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground mb-1">Luas Tanah</p>
                <p className="text-2xl font-bold text-foreground">{property.size} m²</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mx-auto mb-2">
                  <DollarSign className="w-6 h-6 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground mb-1">Kamar Mandi</p>
                <p className="text-2xl font-bold text-foreground">{property.bathrooms}</p>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Deskripsi</h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">{property.description}</p>
            </div>

            {/* Features */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Fasilitas</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {property.features.map((feature: string, idx: number) => (
                  <div key={idx} className="flex items-center text-foreground">
                    <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-primary-foreground text-xs font-bold">✓</span>
                    </div>
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - Contact & CTA */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-lg p-6 sticky top-4">
              <h3 className="text-xl font-semibold mb-6">Hubungi Kami</h3>

              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Telepon</p>
                    <p className="font-semibold text-foreground">+62 31 2345 6789</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Email</p>
                    <p className="font-semibold text-foreground">info@properti-surabaya.com</p>
                  </div>
                </div>
              </div>

              <button className="w-full py-3 bg-primary text-primary-foreground rounded-lg hover:bg-accent transition-colors font-semibold mb-3">
                Hubungi Agen
              </button>

              <button className="w-full py-3 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors font-semibold mb-6">
                Ajukan Penawaran
              </button>

              <Link href="/search" className="block text-center text-primary hover:text-accent text-sm font-medium">
                ← Kembali ke Pencarian
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
