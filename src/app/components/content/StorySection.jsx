import Image from "next/image";
import { motion } from "framer-motion";

export default function StorySection({ items }) {
  if (!items || items.length === 0) return null;

  return (
    <>
      {items.map((item) => (
        <section key={item._id} className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">{item.title}</h2>
            <p className="text-base md:text-lg leading-relaxed">{item.content}</p>
          </motion.div>
          {item.image && (
            <Image
              src={item.image}
              alt={item.title}
              width={500}
              height={400}
              className="rounded-xl shadow-xl object-cover"
            />
          )}
        </section>
      ))}
    </>
  );
}
