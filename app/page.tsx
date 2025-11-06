"use client"
import Link from "next/link"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import AgentSection from "@/components/agent-section"
import { ChevronRight, MapPin, DollarSign } from "lucide-react"

const featuredProperties = [
  {
    id: 1,
    title: "Rumah Modern Darmo",
    price: "Rp 2.500.000.000",
    location: "Darmo, Surabaya",
    type: "Rumah",
    size: 250,
    bedrooms: 4,
    bathrooms: 3,
    image: "/modern-luxury-home.jpg",
    images: [
      "/modern-luxury-home.jpg",
      "/modern-luxury-home.jpg",
      "/modern-luxury-home.jpg",
      "/modern-luxury-home.jpg",
      "/modern-luxury-home.jpg",
      "/modern-luxury-home.jpg",
    ],
    description:
      "Rumah mewah dengan design modern minimalis, dilengkapi fasilitas premium dan lokasi strategis di pusat bisnis Surabaya.",
    features: ["Taman luas", "Garasi 2 mobil", "Kolam renang", "Ruang tamu luas", "Dapur modern", "Smart home system"],
  },
  {
    id: 2,
    title: "Rumah Nyaman Dinoyo",
    price: "Rp 1.200.000.000",
    location: "Dinoyo, Surabaya",
    type: "Rumah",
    size: 180,
    bedrooms: 3,
    bathrooms: 2,
    image: "/comfortable-family-home.jpg",
    images: [
      "/comfortable-family-home.jpg",
      "/comfortable-family-home.jpg",
      "/comfortable-family-home.jpg",
    ],
    description:
      "Rumah nyaman untuk keluarga dengan akses mudah ke sekolah, rumah sakit, dan pusat perbelanjaan.",
    features: ["Taman depan", "Garasi 1 mobil", "Dapur tertutup", "Ruang keluarga luas", "Lokasi tenang"],
  },
  {
    id: 3,
    title: "Apartemen Pusat Kota",
    price: "Rp 800.000.000",
    location: "Jambangan, Surabaya",
    type: "Apartemen",
    size: 120,
    bedrooms: 2,
    bathrooms: 2,
    image: "/modern-city-apartment.png",
    images: [
      "/modern-city-apartment.png",
      "/modern-city-apartment.png",
      "/modern-city-apartment.png",
    ],
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-screen md:h-96 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(/placeholder.svg?height=600&width=1200&query=luxury modern real estate property showcase)",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4 text-balance">
            Temukan Properti Impian Anda
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl text-balance">
            Koleksi properti terlengkap di Surabaya dengan harga terbaik dan lokasi strategis
          </p>
          <Link
            href="/search"
            className="px-8 py-3 bg-primary text-primary-foreground rounded-full hover:bg-accent transition-colors font-medium"
          >
            Cari Properti Sekarang
          </Link>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-3">Properti Pilihan</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Lihat koleksi properti terbaik kami yang telah dipilih khusus untuk memenuhi kebutuhan Anda
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProperties.map((property) => (
              <div
                key={property.id}
                className="bg-card rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
              >
                <div className="relative h-60 overflow-hidden bg-muted">
                  <img
                    src={property.image || "/placeholder.svg"}
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                    {property.type}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-2 text-foreground">{property.title}</h3>
                  <div className="flex items-center text-muted-foreground text-sm mb-4">
                    <MapPin className="w-4 h-4 mr-1" />
                    {property.location}
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-border">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Harga</p>
                      <p className="text-lg font-bold text-primary">{property.price}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Luas</p>
                      <p className="text-lg font-bold text-foreground">{property.size}</p>
                    </div>
                  </div>

                  <Link
                    href={`/properties/${property.id}`}
                    className="flex items-center justify-center gap-2 w-full py-2 bg-muted hover:bg-secondary text-foreground rounded-lg transition-colors font-medium text-sm"
                  >
                    Lihat Detail
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/properties"
              className="px-8 py-3 border border-primary text-primary rounded-full hover:bg-primary hover:text-primary-foreground transition-colors font-medium inline-flex items-center gap-2"
            >
              Lihat Semua Properti
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="relative h-96 max-md:h-[400px] md:h-[800px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url(/OMANTO2.jpeg)",
            backgroundPosition: "center right",
          }}
        >
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6 text-balance">
            Bekerja Bersama Anto
          </h2>
          <p className="text-lg md:text-xl text-white/95 mb-8 max-w-2xl text-balance leading-relaxed">
            Saya mencintai dunia real estate. Saya berusaha membagikan passion ini kepada klien dan akan menggunakan
            pengalaman mendalam saya untuk membantu Anda mewujudkan impian tentang rumah, keluarga, dan pertumbuhan aset
            Anda.
          </p>
          <Link
            href="#agent-section"
            className="px-8 py-3 border-2 border-white text-white rounded-full hover:bg-white hover:text-foreground transition-colors font-medium"
          >
            Hubungi Saya
          </Link>
        </div>
      </section>

      {/* Professional Agents Section */}
      <div id="agent-section">
        <AgentSection />
      </div>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Pilihan Terlengkap</h3>
              <p className="text-muted-foreground">
                Ribuan properti tersedia dari berbagai tipe dan lokasi di Surabaya
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Harga Terjangkau</h3>
              <p className="text-muted-foreground">
                Dapatkan penawaran terbaik dengan sistem pembayaran yang fleksibel
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-secondary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Lokasi Strategis</h3>
              <p className="text-muted-foreground">
                Properti berada di lokasi terbaik dekat pusat kota, sekolah, dan fasilitas umum
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-16 md:py-24 bg-foreground text-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Siap Menemukan Properti Impian?</h2>
          <p className="text-lg text-background/80 mb-8 max-w-2xl mx-auto">
            Tim profesional kami siap membantu Anda menemukan properti yang sesuai dengan kebutuhan dan budget Anda.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/search"
              className="px-8 py-3 bg-primary text-primary-foreground rounded-full hover:bg-accent transition-colors font-medium"
            >
              Mulai Pencarian
            </Link>
            <button className="px-8 py-3 border border-background text-background rounded-full hover:bg-background/10 transition-colors font-medium">
              Hubungi Kami
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
