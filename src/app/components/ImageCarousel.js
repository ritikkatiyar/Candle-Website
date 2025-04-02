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
    <div className="relative flex flex-col md:flex-row justify-center items-center min-h-screen bg-white px-6 py-16 md:py-24 gap-15">
      {/* Image Carousel Section */}
      <div className="mt-25 relative flex flex-col items-center w-full max-w-sm z-10">
        <div className="relative flex items-center justify-center w-full">
          <AnimatePresence mode="wait">
            {images.map((image, i) => {
              const isActive = index === i;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.85, x: 50 }}
                  animate={{
                    opacity: isActive ? 1 : 0.5,
                    scale: isActive ? 1 : 0.85,
                    x: isActive ? 0 : -50,
                    zIndex: isActive ? 10 : 5,
                  }}
                  exit={{ opacity: 0, scale: 0.85, x: -50 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  className="absolute w-full"
                >
                  <Card className="bg-white/20 backdrop-blur-lg shadow-lg p-4 border border-white/30 rounded-2xl">
                    <CardContent className="flex flex-col items-center p-4">
                      <img
                        src={image.src}
                        alt="Slide"
                        className="w-full max-w-[250px] sm:max-w-sm md:max-w-md object-cover rounded-lg"
                      />
                      {isActive && (
                        <button className="mt-4 px-4 py-2 bg-black text-white rounded-md hover:scale-105 transition-transform">
                          Exclusive Products
                        </button>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Description Box */}
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="mt-6 bg-white/40 backdrop-blur-lg p-4 rounded-lg shadow-md w-full text-center"
          >
            <p className="text-gray-900 font-semibold text-base">{images[index].description}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Why Choose Us Section */}
      <div className="w-full max-w-md text-center md:text-left mt-16 md:mt-0">
        <h2 className="text-2xl md:text-3xl font-bold">Why Choose Anaya Candles?</h2>
        <div className="mt-6 space-y-4">
          {["100% Handmade", "Non-Toxic & Eco-Friendly", "Unique Fragrances"].map((feature, i) => (
            <div key={i} className="flex items-center gap-3 justify-center md:justify-start">
              <span className="text-2xl">✔️</span>
              <p className="text-lg font-medium">{feature}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
