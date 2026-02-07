import { motion } from "framer-motion";

export default function FeaturesSection({ title, items }) {
  if (!items || items.length === 0) return null;

  return (
    <section>
      <h2 className="text-center text-2xl md:text-3xl font-semibold mb-8">
        {title}
      </h2>
      <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((item, i) => (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            className="bg-white/10 backdrop-blur-md p-6 rounded-xl text-center shadow-md"
          >
            <p className="text-lg">{item.content}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
