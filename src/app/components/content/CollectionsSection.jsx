import Image from "next/image";
import { motion } from "framer-motion";

export default function CollectionsSection({ title, collections }) {
  if (!collections || collections.length === 0) return null;

  return (
    <section className="bg-gradient-to-b from-white via-[#1a1a1a] to-black text-white py-16 px-4 sm:px-6 md:px-12 lg:px-20">
      <h2 className="text-center text-2xl md:text-3xl font-semibold mb-8">
        {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {collections.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            className="bg-white/5 p-4 rounded-lg shadow-md group h-full"
          >
            <Image
              src={item.img}
              alt={item.name}
              width={300}
              height={200}
              className="w-full h-44 sm:h-48 object-cover rounded-md mb-3"
            />
            <h3 className="text-xl font-bold">{item.name}</h3>
            <p
              className="text-sm text-gray-200 max-h-12 overflow-hidden transition-[max-height] duration-300 group-hover:max-h-40 group-hover:overflow-auto hide-scrollbar"
              title={item.desc}
            >
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
