import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

export default function ImageCarousel() {
  const [images, setImages] = useState([]);
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        const allImages = data.filter((p) => p.image);
        setImages(allImages.map((p) => ({
          src: p.image,
          name: p.name,
        })));
      } catch (error) {
        console.error('Error fetching carousel products:', error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (images.length === 0) return;
    if (isPaused) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length, isPaused]);

  useEffect(() => {
    if (index >= images.length) {
      setIndex(0);
    }
  }, [images.length, index]);

  const safeIndex = useMemo(() => {
    if (images.length === 0) return 0;
    return index % images.length;
  }, [images.length, index]);

  const goPrev = () => {
    if (images.length === 0) return;
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goNext = () => {
    if (images.length === 0) return;
    setIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <section className="w-full bg-gradient-to-b from-black/98 via-[#0f0f0f] to-white text-white py-16 px-4 sm:px-6 md:px-12 flex flex-col lg:flex-row items-center justify-between gap-14 lg:gap-20">
      {/* Carousel Section */}
      <div className="w-full lg:w-1/2 flex flex-col items-center relative">
        <div
          className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-md aspect-[4/5]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="absolute -inset-6 bg-gradient-to-br from-white/38 via-white/14 to-transparent blur-[60px] rounded-[40px]" />
          <AnimatePresence mode="sync">
            {images[safeIndex] && (
              <motion.div
                key={safeIndex}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="absolute w-full"
              >
                <Card className="bg-gradient-to-b from-white/84 via-white/76 to-white/72 backdrop-blur-sm border border-black/8 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] transition-all overflow-hidden">
                  <CardContent className="p-4 flex flex-col items-center">
                    <div className="relative w-full h-[260px] sm:h-[300px] md:h-[330px] rounded-xl overflow-hidden">
                      <Image
                        src={images[safeIndex].src}
                        alt={images[safeIndex].name || `Candle ${safeIndex + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 80vw, 40vw"
                      />
                    </div>
                    <div className="mt-4 w-full flex items-center justify-between">
                      <div className="text-left">
                        <p className="text-xs uppercase tracking-widest text-black/60">Featured</p>
                        <p className="text-base font-semibold text-black">
                          {images[safeIndex].name || "Anaya Collection"}
                        </p>
                      </div>
                      <button className="px-4 py-2 rounded-full font-semibold text-black border border-black/10 bg-gradient-to-b from-white/88 via-white/78 to-white/70 shadow-[0_8px_20px_rgba(0,0,0,0.18)] backdrop-blur-sm hover:from-white/92 hover:via-white/82 hover:to-white/74 transition-all duration-300 text-sm">
                        View
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Controls removed */}
        </div>

        {/* Dots */}
        {images.length > 1 && (
          <div className="mt-4 flex items-center gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={
                  i === safeIndex
                    ? 'w-6 h-2 rounded-full bg-amber-400'
                    : 'w-2 h-2 rounded-full bg-white/30 hover:bg-white/60'
                }
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        )}

      </div>

      {/* Why Choose Us Section */}
      <div className="w-full lg:w-1/2 text-center lg:text-left">
        <p className="text-sm uppercase tracking-[0.3em] text-amber-400/80">Curated Craft</p>
        <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
          Why Choose <span className="text-yellow-500">Anaya Candles?</span>
        </h2>
        <p className="mt-4 text-gray-300 text-base sm:text-lg max-w-xl mx-auto lg:mx-0">
          Discover the charm of artisanal craftsmanship and soothing aromas that elevate your ambiance.
        </p>
        <div className="mt-6 space-y-4">
          {[
            '100% Handmade with Care',
            'Eco-Friendly & Non-Toxic',
            'Distinct & Calming Scents',
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
