import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const images = ["/main1.jpg"]; // Ensure all paths are correct

const products = [
  { name: "Rosette Radiance", price: "₹300.00", image: "/main1.jpg" },
  { name: "Supreme Essence", price: "₹40.00", image: "/main2.jpg" },
  { name: "Candie", price: "₹300.00", image: "/main3.jpg" },
];

const HeroSection = ({ onShopNowClick }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000); // Change every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="font-serif bg-[#FAF7F2] text-gray-900">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] sm:h-screen flex items-center justify-center text-center text-white bg-black px-4 overflow-hidden">
      {/* Background Image */}
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

      {/* Content */}
      <div className="relative z-10">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-semibold">
          Handcrafted Candles for Every Moment
        </h1>
        <button
          onClick={onShopNowClick}
          className="mt-6 px-6 py-3 bg-white text-black border border-white rounded-full hover:bg-gray-100 hover:text-black transition-all duration-300"
        >
          Shop Now
        </button>
      </div>
    </section>

      {/* Featured Collections */}
      <section className="py-12 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold">Featured Collections</h2>

        {/* Scrollable container for mobile */}
        <div className="mt-8 overflow-x-auto">
          <div className="flex sm:grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4 sm:px-0">
            {products.map((item, index) => (
              <div
                key={index}
                className="bg-white p-4 shadow-lg rounded-lg min-w-[250px] sm:w-auto"
              >
                <Image
                  src={item.image || "/fallback.jpg"} // Fallback image
                  alt={item.name || "Product Image"}
                  width={300}
                  height={300}
                  className="rounded-lg w-full h-auto"
                />
                <h3 className="mt-4 text-lg sm:text-xl font-semibold">
                  {item.name}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  {item.price}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
