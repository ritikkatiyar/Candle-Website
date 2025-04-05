import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const images = ["/main4.jpeg", "/main3.jpeg"];

const products = [
  { name: "Rosette Radiance", price: "₹240.00", image: "/main1.jpg" },
  { name: "Supreme Essence", price: "₹40.00", image: "/main2.jpg" },
  { name: "Candie", price: "₹300.00", image: "/main3.jpg" },
];

const HeroSection = ({ onShopNowClick }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="font-serif bg-[#121212] text-white">
      {/* Hero Banner */}
      <section className="relative w-full h-[60vh] sm:h-screen flex items-center justify-center text-center px-4 overflow-hidden">
        {/* Background Image Carousel */}
        <div className="absolute inset-0">
          {images.length > 1 ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 1 }}
                className="absolute inset-0"
              >
                <Image
                  src={images[index]}
                  alt="Background"
                  fill
                  style={{ objectFit: "cover", objectPosition: "center" }}
                  className="opacity-80"
                />
              </motion.div>
            </AnimatePresence>
          ) : (
            <Image
              src={images[0]}
              alt="Background"
              fill
              style={{ objectFit: "cover", objectPosition: "center" }}
              className="opacity-80"
            />
          )}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold leading-tight">
            Handcrafted Candles <br /> for Every Moment
          </h1>
          <button
            onClick={onShopNowClick}
            className="mt-6 px-6 py-3 bg-yellow-500 text-black font-semibold rounded-full shadow-lg hover:bg-yellow-400 transition-all duration-300"
          >
            🛍️ Shop Now
          </button>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-16 px-4 sm:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10">
          ✨ Featured Collections
        </h2>

        <div className="flex sm:grid sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto overflow-x-auto pb-4">
          {products.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-md border border-white/20 text-white p-5 rounded-2xl shadow-xl min-w-[250px] sm:w-auto"
            >
              <Image
                src={item.image || "/fallback.jpg"}
                alt={item.name || "Product Image"}
                width={400}
                height={400}
                className="rounded-xl w-full h-60 object-cover"
              />
              <h3 className="mt-4 text-xl font-semibold">{item.name}</h3>
              <p className="text-gray-300 text-base">{item.price}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
