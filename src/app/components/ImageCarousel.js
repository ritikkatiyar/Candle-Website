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
    }, 4000); // Smooth rotation every 4 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col md:flex-row justify-center items-center min-h-screen bg-white px-6 py-12 md:py-16">
      {/* Image Carousel Section */}
      <div className="relative flex flex-col items-center justify-center w-full max-w-md sm:max-w-lg md:max-w-xl">
        <div className="relative flex items-center justify-center w-full max-w-xs sm:max-w-sm md:max-w-md">
          <AnimatePresence mode="wait">
            {images.map((image, i) => {
              const isActive = index === i;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8, x: 50 }}
                  animate={{
                    opacity: isActive ? 1 : 0.5,
                    scale: isActive ? 1 : 0.85,
                    x: isActive ? 0 : -50,
                    zIndex: isActive ? 10 : 5,
                  }}
                  exit={{ opacity: 0, scale: 0.8, x: -50 }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                  className={`absolute w-full`}
                >
                  <Card className="bg-white/20 backdrop-blur-lg shadow-lg p-4 border border-white/30 rounded-2xl">
                    <CardContent className="flex flex-col items-center p-4">
                      <img
                        src={image.src}
                        alt="Slide"
                        className="w-full max-w-xs sm:max-w-sm md:max-w-md object-cover rounded-lg"
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
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="mt-8 md:ml-6 bg-white/30 backdrop-blur-lg p-6 rounded-lg shadow-md w-full max-w-xs sm:max-w-sm md:max-w-md text-center md:text-left"
          >
            <p className="text-gray-900 font-semibold text-lg">{images[index].description}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Why Choose Us - Beside on Large Screens */}
      <div className="mt-12 md:mt-0 md:ml-12 text-center md:text-left max-w-xs sm:max-w-sm md:max-w-md">
        <h2 className="text-3xl font-bold">Why Choose Anaya Candles?</h2>
        <div className="mt-6 space-y-4">
          {["100% Handmade", "Non-Toxic & Eco-Friendly", "Unique Fragrances"].map((feature, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="text-3xl">✔️</span>
              <p className="text-lg font-medium">{feature}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
