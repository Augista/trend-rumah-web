import { FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-foreground text-background py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Kolom 1 */}
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">KUSWANTO</h3>
            <p className="text-sm text-background/70 leading-relaxed">
              Agensi real estate terpercaya yang membantu Anda menemukan properti impian di Surabaya.
            </p>
          </div>

          {/* Kolom 2 */}
          <div>
            <h4 className="font-semibold mb-4 text-sm">Navigasi</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li>
                <a href="/" className="hover:text-background transition">
                  Beranda
                </a>
              </li>
              <li>
                <a href="/properties" className="hover:text-background transition">
                  Properti
                </a>
              </li>
              <li>
                <a href="/search" className="hover:text-background transition">
                  Cari Properti
                </a>
              </li>
            </ul>
          </div>

          {/* Kolom 3 */}
          <div>
            <h4 className="font-semibold mb-4 text-sm">Kontak</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li>Surabaya, Jawa Timur</li>
              <li>+62 81235749112</li>
              <li>IG: @kuswanto_trendrumahsurabaya</li>
            </ul>
          </div>

          {/* Kolom 4 */}
          <div>
            <h4 className="font-semibold mb-4 text-sm">Ikuti Kami</h4>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/kuswanto_trendrumahsurabaya"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-background/50 flex items-center justify-center hover:bg-background/10 transition"
              >
                <FaInstagram className="text-white text-lg" /> {/* 👈 warna putih */}
              </a>
            </div>
          </div>
        </div>

        {/* Footer bawah */}
        <div className="border-t border-background/20 pt-8">
          <p className="text-sm text-background/60 text-center">
            © 2025 KuswantoProperty. Semua hak dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
}
