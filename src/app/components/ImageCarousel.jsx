import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const images = [
  { src: "/candle1.JPG", description: "Relaxing lavender-scented candle." },
  { src: "/candle2.JPG", description: "Elegant vanilla bean fragrance." },
  { src: "/candle3.JPG", description: "Soothing sandalwood essence." },
];

export default function ImageCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen bg-[#121212] text-white py-16 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-20">
      {/* Carousel Section */}
      <div className="w-full md:w-1/2 flex flex-col items-center relative">
        <div className="relative w-full max-w-sm h-[380px]">
          <AnimatePresence mode="wait">
            {images.map((image, i) => {
              const isActive = index === i;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{
                    opacity: isActive ? 1 : 0,
                    scale: isActive ? 1 : 0.95,
                    zIndex: isActive ? 10 : 0,
                  }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 1 }}
                  className="absolute w-full"
                >
                  <Card className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-xl transition-all">
                    <CardContent className="p-4 flex flex-col items-center">
                      <img
                        src={image.src}
                        alt={`Candle ${i + 1}`}
                        className="rounded-xl object-cover w-full max-h-[250px]"
                      />
                      {isActive && (
                        <button className="mt-5 px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-white font-medium rounded-lg shadow-md transition-transform hover:scale-105">
                          🕯️ View Product
                        </button>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Description */}
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="mt-6 bg-white/10 backdrop-blur-md px-4 py-3 rounded-xl text-center shadow-md text-white max-w-sm"
          >
            <p className="text-base font-medium">{images[index].description}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Why Choose Us Section */}
      <div className="w-full md:w-1/2 text-center md:text-left">
        <h2 className="text-3xl lg:text-4xl font-bold text-white">
          Why Choose <span className="text-yellow-500">Anaya Candles?</span>
        </h2>
        <p className="mt-4 text-gray-300 text-lg max-w-md">
          Discover the charm of artisanal craftsmanship and soothing aromas that elevate your ambiance.
        </p>
        <div className="mt-6 space-y-4">
          {[
            "🧵 100% Handmade with Care",
            "🌱 Eco-Friendly & Non-Toxic",
            "🌸 Distinct & Calming Scents",
          ].map((feature, i) => (
            <div
              key={i}
              className="flex items-center gap-3 justify-center md:justify-start text-lg font-medium text-gray-200"
            >
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
