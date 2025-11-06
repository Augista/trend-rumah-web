"use client"
import { useEffect, useState } from "react"
import { X } from "lucide-react"
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
  2: {
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
  3: {
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
    description:
      "Apartemen modern di pusat kota dengan akses strategis ke perkantoran, mall, dan transportasi umum.",
    features: ["Keamanan 24 jam", "Kolam renang", "Gym", "Parkir luas", "Akses lift pribadi"],
  },
  4: {
    title: "Ruko Soekarno-Hatta",
    price: "Rp 1.200.000.000",
    location: "Tegalsari, Surabaya",
    type: "Ruko",
    size: 180,
    bedrooms: 0,
    bathrooms: 2,
    image: "/traditional-shophouse.png",
    images: [
      "/traditional-shophouse.png",
      "/traditional-shophouse.png",
      "/traditional-shophouse.png",
    ],
    description:
      "Ruko strategis cocok untuk usaha dan kantor, terletak di area ramai dengan akses kendaraan mudah.",
    features: ["Lantai 2", "Parkir depan ruko", "Toilet di setiap lantai", "Dekat area komersial"],
  },
  5: {
    title: "Rumah Mewah Ketintang",
    price: "Rp 3.000.000.000",
    location: "Genteng, Surabaya",
    type: "Rumah",
    size: 300,
    bedrooms: 5,
    bathrooms: 4,
    image: "/luxury-home.png",
    images: [
      "/luxury-home.png",
      "/luxury-home.png",
      "/luxury-home.png",
      "/luxury-home.png",
    ],
    description:
      "Rumah mewah dengan desain elegan dan taman luas, berada di lingkungan eksklusif dan nyaman.",
    features: ["Kolam renang", "Garasi 2 mobil", "Ruang tamu luas", "Teras belakang", "Keamanan 24 jam"],
  },
  6: {
    title: "Ruko Bisnis Tanjungsari",
    price: "Rp 950.000.000",
    location: "Tegalsari, Surabaya",
    type: "Ruko",
    size: 150,
    bedrooms: 0,
    bathrooms: 2,
    image: "/business-shop.jpg",
    images: [
      "/business-shop.jpg",
      "/business-shop.jpg",
      "/business-shop.jpg",
    ],
    description:
      "Ruko bisnis siap pakai di kawasan komersial Tanjungsari, cocok untuk usaha retail maupun kantor.",
    features: ["Akses utama jalan besar", "Toilet dalam", "Listrik 2200W", "Dekat pusat kota"],
  },
  7: {
    title: "Apartemen Modern Surabaya",
    price: "Rp 600.000.000",
    location: "Bulak, Surabaya",
    type: "Apartemen",
    size: 100,
    bedrooms: 2,
    bathrooms: 1,
    image: "/modern-apartment-living.png",
    images: [
      "/modern-apartment-living.png",
      "/modern-apartment-living.png",
      "/modern-apartment-living.png",
    ],
    description:
      "Apartemen bergaya modern dengan fasilitas lengkap dan pemandangan kota yang menawan.",
    features: ["Gym", "Kolam renang", "Parkir aman", "Keamanan 24 jam", "Dekat pantai Kenjeran"],
  },
  8: {
    title: "Rumah Asri Gubeng",
    price: "Rp 1.500.000.000",
    location: "Gubeng, Surabaya",
    type: "Rumah",
    size: 200,
    bedrooms: 4,
    bathrooms: 3,
    image: "/nice-home.jpg",
    images: [
      "/nice-home.jpg",
      "/nice-home.jpg",
      "/nice-home.jpg",
    ],
    description:
      "Rumah asri dengan lingkungan hijau dan udara sejuk, cocok untuk keluarga yang mengutamakan kenyamanan.",
    features: ["Halaman luas", "Garasi 2 mobil", "Teras depan", "Ruang makan besar", "Lokasi strategis"],
  },
};



export default function PropertyDetailPage() {
  const params = useParams()
  const [showGallery, setShowGallery] = useState(false)
  const [activeImage, setActiveImage] = useState(0)
  const [isClient, setIsClient] = useState(false)
  const propertyId = Number.parseInt(params.id as string)
  const property = propertyDetails[propertyId] || propertyDetails[1]

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null // cegah render sebelum client siap


  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Image Gallery */}
<section className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
    {/* Gambar utama */}
    <div className="md:col-span-4">
      <img
        src={property.images?.[activeImage] || "/placeholder.svg"}
        alt={property.title}
        className="w-full h-[400px] object-cover rounded-xl shadow-md"
      />
    </div>

    {/* Thumbnail */}
    <div className="hidden md:flex md:flex-col gap-3">
      {property.images?.slice(1, 4).map((img: string, idx: number) => (
        <img
          key={idx}
          src={img}
          alt={`Foto ${idx + 1}`}
          className="w-full h-[120px] object-cover rounded-lg border hover:opacity-80 transition cursor-pointer"
          onClick={() => setActiveImage(idx + 1)}
        />
      ))}

      {property.images?.length > 4 && (
        <div
          className="relative w-full h-[120px] rounded-lg overflow-hidden cursor-pointer"
          onClick={() => setShowGallery(true)}
        >
          <img
            src={property.images[4]}
            alt="Lihat Semua"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-semibold">
            Lihat Semua
          </div>
        </div>
      )}
    </div>
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
          {property.images?.map((img: string, idx: number) => (
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
                  <Phone className="w-5 h-5 text-primary mt-1 shrink-0" />
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Whatsapp</p>
                    <p className="font-semibold text-foreground">+6281235749112</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-primary mt-1 shrink-0" />
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Instagram</p>
                    <p className="font-semibold text-foreground">kuswanto_trendrumahsurabaya</p>
                  </div>
                </div>
              </div>

            <button
            onClick={() =>
              window.open(
                "https://wa.me/+6281235749112?text=Halo%20saya%20tertarik%20dengan%20properti%20ini",
                "_blank"
              )
            }
            className="w-full py-3 bg-primary text-primary-foreground rounded-lg hover:bg-accent transition-colors font-semibold mb-3"
          >
                Hubungi Agen
              </button>

          <button
            onClick={() =>
              window.open(
                "https://wa.me/+6281235749112?text=Halo%20saya%20ingin%20mengajukan%20penawaran%20untuk%20properti%20ini",
                "_blank"
              )
            }
            className="w-full py-3 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors font-semibold mb-6"
          >
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
