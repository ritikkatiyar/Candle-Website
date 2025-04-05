import Image from "next/image";
import Contact from "./Contact";
import { useState } from "react";

const products = [
  {
    name: "Single Luxury Candle",
    price: "₹399 – ₹499",
    offer: "Buy 1, Get 1 at 50% Off",
    image: "/candle1.JPG",
  },
  {
    name: "Candle Gift Box",
    price: "₹1,299 – ₹1,499",
    offer: "Exclusive Festive Combo",
    image: "/candle2.JPG",
  },
  {
    name: "Limited Edition Candle",
    price: "₹699 – ₹899",
    offer: "Free Personalization",
    image: "/candle3.JPG",
  },
  {
    name: "DIY Candle-Making Kit",
    price: "₹799 – ₹999",
    offer: "Create Your Own Scent",
    image: "/candle4.JPG",
  },
];

export default function FeaturedProducts({ refProp }) {
  const [isPopupOpen, setPopupOpen] = useState(false);

  return (
    <section
      ref={refProp}
      className="py-16 px-4 bg-[#0d0d0d] text-white text-center"
    >
      <h2 className="text-3xl sm:text-4xl font-bold mb-8 tracking-tight">
        ✨ Featured Collections
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {products.map((item, index) => (
          <div
            key={index}
            className="bg-[#1a1a1a] hover:shadow-lg hover:scale-[1.02] transition-all duration-300 rounded-2xl overflow-hidden shadow-md flex flex-col items-center p-6"
          >
            <Image
              src={item.image}
              alt={item.name}
              width={250}
              height={250}
              className="rounded-xl object-cover mb-4"
            />

            <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
            <p className="text-gray-300 text-sm mb-1">{item.price}</p>
            <p className="text-yellow-400 text-sm italic">{item.offer}</p>

            <button
              className="mt-4 px-6 py-2 bg-gradient-to-r from-yellow-500 to-orange-400 text-black font-medium rounded-full hover:from-yellow-400 hover:to-orange-300 transition-all duration-300"
              onClick={() => setPopupOpen(true)}
            >
              🛍️ Shop Now
            </button>
          </div>
        ))}
      </div>

      {/* Contact Popup */}
      <Contact isOpen={isPopupOpen} onClose={() => setPopupOpen(false)} />
    </section>
  );
}
