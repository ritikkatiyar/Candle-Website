export default function CareTipsSection({ title, items }) {
  if (!items || items.length === 0) return null;

  return (
    <section className="text-center max-w-2xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-semibold mb-6">{title}</h2>
      <div className="text-left space-y-2 text-base md:text-lg">
        {items.map((item) => (
          <p key={item._id}>{item.content}</p>
        ))}
      </div>
    </section>
  );
}
