import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductDetailModal({ product, images, onClose, onAddToCart }) {
  if (!product) return null;

  const gallery = images && images.length ? images : [product.image].filter(Boolean);

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.98, opacity: 0 }}
            transition={{ type: "spring", stiffness: 240, damping: 22 }}
            className="relative w-[94%] sm:w-[92%] md:w-[86%] lg:w-[78%] xl:w-[70%] max-h-[88vh] bg-white/95 border border-black/10 shadow-[0_30px_80px_rgba(0,0,0,0.22)] rounded-2xl overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Left: Image Grid */}
              <div className="bg-[#f6f5f1] p-5 sm:p-6 lg:p-8">
                <div className="grid grid-cols-2 gap-3">
                  {gallery.map((src, i) => (
                    <div
                      key={src + i}
                      className={`relative overflow-hidden rounded-xl bg-white ${
                        gallery.length === 1 ? "col-span-2 aspect-[4/3]" : "aspect-square"
                      }`}
                    >
                      <Image
                        src={src}
                        alt={`${product.name} ${i + 1}`}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 90vw, 45vw"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Details */}
              <div className="p-6 sm:p-8 lg:p-10 flex flex-col gap-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-2xl sm:text-3xl tracking-wide font-semibold">
                      {product.name}
                    </h2>
                    <p className="mt-1 text-sm text-black/60">Classic Candle Refill</p>
                    {product.sku && (
                      <p className="mt-2 text-xs text-black/40 uppercase tracking-widest">
                        SKU {product.sku}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={onClose}
                    className="rounded-full border border-black/10 bg-black/5 hover:bg-black/10 text-black px-3 py-1 text-sm"
                  >
                    Close
                  </button>
                </div>

                <div className="text-sm text-black/70 leading-relaxed">
                  {product.description || "Notes of soft florals, warm vanilla, and calming woods."}
                </div>

                <div className="border border-black/10 rounded-lg p-4 flex items-center justify-between">
                  <span className="text-sm">One time purchase</span>
                  <span className="font-semibold">{product.price}</span>
                </div>

                <div className="grid grid-cols-[120px_1fr] gap-3 items-center">
                  <div className="grid grid-cols-3 border border-black/10 rounded-lg overflow-hidden">
                    <button className="py-2 text-lg">-</button>
                    <div className="py-2 text-center text-sm">1</div>
                    <button className="py-2 text-lg">+</button>
                  </div>
                  <button
                    onClick={() => onAddToCart(product)}
                    className="w-full py-3 rounded-lg font-semibold text-black border border-black/10 bg-gradient-to-b from-white/92 via-white/84 to-white/78 shadow-[0_6px_16px_rgba(0,0,0,0.12)] backdrop-blur-sm hover:from-white/96 hover:via-white/88 hover:to-white/82 transition"
                  >
                    Add to Cart
                  </button>
                </div>

                <div className="text-xs text-black/50 bg-black/5 rounded-md px-3 py-2">
                  ✓ 1–2 business days for processing.
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
