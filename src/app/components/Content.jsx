'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const features = [
  "✨ Eco-Friendly Wax – Made with sustainable, toxin-free ingredients.",
  "🌸 Aromas That Speak – Scents that transport you to beautiful memories.",
  "🕯️ Unique Designs – From floral embeds to coconut shell creations."
];

const collections = [
  { name: "Aroma Therapy", img: "/aroma.jpeg", desc: "Infused with calming essential oils." },
  { name: "Eco-Friendly", img: "/eco.jpeg", desc: "Upcycled coconut shell & soy wax candles." },
  { name: "Luxury", img: "/luxury.JPG", desc: "Premium handcrafted elegance." },
  { name: "Festive", img: "/candle3.JPG", desc: "Perfect for Diwali, Christmas & more." },
];

export default function Content() {
  return (
    <main className="bg-[#0d0d0d] text-white px-4 sm:px-6 md:px-12 lg:px-20 py-12 space-y-16">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center max-w-4xl mx-auto"
      >
        <h1 className="text-3xl md:text-5xl font-bold mb-4">✨ About Anaya Candles – Where Light Meets Art! 🕯️</h1>
        <p className="text-lg md:text-xl">
          At Anaya Candles, we believe a candle is more than just wax and wick—it's an experience, a memory, and a moment of peace.
        </p>
      </motion.div>

      {/* Our Story */}
      <section className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">💛 Our Story</h2>
          <p className="text-base md:text-lg leading-relaxed">
            Anaya Candles was born out of a passion to blend creativity with sustainability. What started as a hobby is now a growing brand pouring love into every candle. From cozy nights to festive celebrations, we light up your world.
          </p>
        </motion.div>
        <Image
          src="/story.jpeg"
          alt="Our Story"
          width={500}
          height={400}
          className="rounded-xl shadow-xl object-cover"
        />
      </section>

      {/* Features */}
      <section>
        <h2 className="text-center text-2xl md:text-3xl font-semibold mb-8">🌿 Handcrafted with Passion & Purpose</h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="bg-white/10 backdrop-blur-md p-6 rounded-xl text-center shadow-md"
            >
              <p className="text-lg">{feat}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Collections */}
      <section>
        <h2 className="text-center text-2xl md:text-3xl font-semibold mb-8">🔥 Explore Our Collections</h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {collections.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="bg-white/5 p-4 rounded-lg shadow-md"
            >
              <Image
                src={item.img}
                alt={item.name}
                width={300}
                height={200}
                className="w-full h-48 object-cover rounded-md mb-3"
              />
              <h3 className="text-xl font-bold">{item.name}</h3>
              <p className="text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Candle Care Tips */}
      <section className="text-center max-w-2xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">💡 Candle Care Tips</h2>
        <ul className="text-left space-y-2 text-base md:text-lg">
          <li>✅ Trim the wick to ¼ inch before lighting.</li>
          <li>✅ Let the wax melt evenly for a clean burn.</li>
          <li>✅ Avoid placing candles near air vents or drafts.</li>
          <li>✅ Reuse your candle jars creatively!</li>
        </ul>
      </section>

      {/* Customer Reviews */}
      <section className="text-center max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">❤️ Customer Love</h2>
        <p className="italic mb-4">“The fragrance, the design, the packaging—everything is just perfect. You can tell these candles are made with so much care and love!” — Rohan K.</p>
        <p className="italic">“I absolutely LOVE Anaya Candles! The coconut shell candle not only smells amazing but also looks stunning in my home décor.” — Priya S.</p>
      </section>

      {/* Contact & CTA */}
      <section className="text-center space-y-6">
        <p className="text-xl">✨ Let’s Create Something Beautiful Together!</p>
        <div className="flex justify-center gap-4 flex-wrap">
          <a href="#" className="px-6 py-3 bg-yellow-400 text-black rounded-lg hover:scale-105 transition">🛒 Shop Now</a>
          <a href="#" className="px-6 py-3 border border-yellow-400 text-yellow-400 rounded-lg hover:bg-yellow-400 hover:text-black transition">📩 Contact Us</a>
        </div>
      </section>
    </main>
  );
}
