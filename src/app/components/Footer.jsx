import { Mail, Phone, Instagram, Youtube, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0d0d0d] backdrop-blur-lg text-white px-6 sm:px-10 py-12 mt-20 rounded-t-3xl border-t border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
      <div className="max-w-6xl mx-auto grid gap-10 sm:grid-cols-2 md:grid-cols-3">
        {/* Business Info */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-white">Anaya Candles</h2>
          <p className="flex items-center gap-2 mb-3 text-sm text-gray-300">
            <Phone size={18} className="text-rose-400" />
            9554704110 / +91 91402 06166
          </p>
          <p className="flex items-center gap-2 text-sm text-gray-300">
            <Mail size={18} className="text-rose-400" />
            <a href="mailto:anaya.candles.2000@gmail.com" className="hover:underline">
              anaya.candles.2000@gmail.com
            </a>
          </p>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-white">Connect with Us</h3>
          <ul className="space-y-3 text-sm">
            <li>
              <a
                href="https://whatsapp.com/channel/0029Vb6CIQa9MF92AAbQhW22"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-300 hover:text-green-400 transition"
              >
                <MessageCircle size={18} className="text-green-400" />
                WhatsApp Channel
              </a>
            </li>
            <li>
              <a
                href="https://youtube.com/@anayacandle?si=RR0zbyqr50sTavjb"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-300 hover:text-red-400 transition"
              >
                <Youtube size={18} className="text-red-400" />
                YouTube
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/anaya_candles?igsh=MTk5NTU4Y3Rpbjdr"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-300 hover:text-pink-400 transition"
              >
                <Instagram size={18} className="text-pink-400" />
                Instagram
              </a>
            </li>
          </ul>
        </div>

        {/* Branding or CTA */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-white">Stay Bright ✨</h3>
          <p className="text-sm text-gray-400 mb-4">
            Discover handmade candles that light up your soul.
          </p>
          <a
            href="mailto:anaya.candles.2000@gmail.com"
            className="inline-block px-5 py-2 bg-rose-600 hover:bg-rose-700 text-sm font-medium rounded-full shadow-lg transition"
          >
            Contact Us
          </a>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-12 text-center text-xs text-gray-500 border-t border-white/10 pt-6">
        © {new Date().getFullYear()} Anaya Candles. All rights reserved.
      </div>
    </footer>
  );
}
