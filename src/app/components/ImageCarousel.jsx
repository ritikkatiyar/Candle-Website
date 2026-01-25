import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { PRODUCT_CATEGORIES } from "@/lib/constants";

export default function ImageCarousel() {
  const [images, setImages] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        const carouselProducts = data.filter(p => p.category === PRODUCT_CATEGORIES.CAROUSEL);
        setImages(carouselProducts.map(p => ({ src: p.image, description: p.description })));
      } catch (error) {
        console.error('Error fetching carousel products:', error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (images.length === 0) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="w-full bg-[#121212] text-white py-16 px-4 sm:px-6 md:px-12 flex flex-col lg:flex-row items-center justify-between gap-14 lg:gap-20">
      {/* Carousel Section */}
      <div className="w-full lg:w-1/2 flex flex-col items-center relative">
        <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-sm h-[360px] sm:h-[400px]">
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
                        className="rounded-xl object-cover w-full h-[220px] sm:h-[250px] md:h-[280px]"
                      />
                      {isActive && (
                        <button className="mt-5 w-full sm:w-auto px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-white font-medium rounded-lg shadow-md transition-transform hover:scale-105 text-sm sm:text-base">
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
        {images.length > 0 && (
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="mt-6 bg-white/10 backdrop-blur-md px-4 py-3 rounded-xl text-center shadow-md text-white w-full max-w-xs sm:max-w-sm"
            >
              <p className="text-sm sm:text-base font-medium">{images[index].description}</p>
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      {/* Why Choose Us Section */}
      <div className="w-full lg:w-1/2 text-center lg:text-left">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
          Why Choose <span className="text-yellow-500">Anaya Candles?</span>
        </h2>
        <p className="mt-4 text-gray-300 text-base sm:text-lg max-w-xl mx-auto lg:mx-0">
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
              className="flex items-center gap-3 justify-center lg:justify-start text-base sm:text-lg font-medium text-gray-200"
            >
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
