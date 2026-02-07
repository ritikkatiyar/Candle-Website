export default function ReviewsSection({ title, items }) {
  if (!items || items.length === 0) return null;

  return (
    <section className="text-center max-w-3xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-semibold mb-6">{title}</h2>
      {items.map((item) => (
        <p key={item._id} className="italic mb-4">
          {item.content}
        </p>
      ))}
    </section>
  );
}
