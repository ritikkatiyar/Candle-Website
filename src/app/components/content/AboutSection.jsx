import { motion } from "framer-motion";

export default function AboutSection({ items }) {
  if (!items || items.length === 0) return null;

  return (
    <>
      {items.map((item) => (
        <motion.div
          key={item._id}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-3xl md:text-5xl font-bold mb-4">{item.title}</h1>
          <p className="text-lg md:text-xl">{item.content}</p>
        </motion.div>
      ))}
    </>
  );
}
