export default function ContactCTASection({ items, onOpenContact }) {
  const hasItems = items && items.length > 0;

  return (
    <section className="text-center space-y-6">
      {hasItems ? (
        items.map((item) => (
          <div key={item._id}>
            <p className="text-xl mb-4">{item.content}</p>
            <div className="flex justify-center gap-4 flex-wrap">
              <a
                className="px-6 py-3 bg-yellow-400 text-black rounded-lg hover:scale-105 transition"
                href="https://wa.me/c/919140206166"
                target="_blank"
                rel="noopener noreferrer"
              >
                Shop Now
              </a>
              <button
                className="px-6 py-3 border border-yellow-400 text-yellow-400 rounded-lg hover:bg-yellow-400 hover:text-black transition"
                onClick={onOpenContact}
              >
                Contact Us
              </button>
            </div>
          </div>
        ))
      ) : (
        <div>
          <p className="text-xl">Let's Create Something Beautiful Together!</p>
          <div className="mt-6 flex justify-center gap-4 flex-wrap">
            <a
              className="px-6 py-3 bg-yellow-400 text-black rounded-lg hover:scale-105 transition"
              href="https://wa.me/c/919140206166"
              target="_blank"
              rel="noopener noreferrer"
            >
              Shop Now
            </a>
            <button
              className="px-6 py-3 border border-yellow-400 text-yellow-400 rounded-lg hover:bg-yellow-400 hover:text-black transition"
              onClick={onOpenContact}
            >
              Contact Us
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
