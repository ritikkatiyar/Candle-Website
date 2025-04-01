import Image from "next/image";

const products = [
  { name: "Single Luxury Candle", price: "₹399 – ₹499", offer: "Buy 1, Get 1 at 50% Off", image: "/hero.jpg" },
  { name: "Candle Gift Box", price: "₹1,299 – ₹1,499", offer: "Exclusive Festive Combo", image: "/hero.jpg" },
  { name: "Limited Edition Candle", price: "₹699 – ₹899", offer: "Free Personalization", image: "/hero.jpg" },
  { name: "DIY Candle-Making Kit", price: "₹799 – ₹999", offer: "Create Your Own Scent", image: "/hero.jpg" },
];

export default function FeaturedProducts({ refProp }) {
  return (
    <section ref={refProp} className="py-12 text-center bg-[#f9f6f1] text-gray-900">
      <h2 className="text-2xl sm:text-3xl font-bold">Featured Collections</h2>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
        {products.map((item, index) => (
          <div key={index} className="bg-white p-4 shadow-lg rounded-lg flex items-center space-x-6">
            <Image
              src={item.image}
              alt={item.name}
              width={150}
              height={150}
              className="rounded-lg"
            />
            <div className="text-left">
              <h3 className="text-lg sm:text-xl font-2xl">{item.name}</h3>
              <p className="text-gray-600 text-sm sm:text-base">{item.price}</p>
              <p className="text-sm text-green-500">{item.offer}</p>
              <button className="mt-3 px-4 py-2 bg-[#2a2925] text-white rounded-md hover:bg-gray-800 transition duration-300">
                Shop Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
