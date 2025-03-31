import Image from "next/image";

export default function Home() {
  return (
    <div className="font-serif bg-[#FAF7F2] text-gray-900">
      {/* Hero Section */}
      <section className="relative w-full h-screen flex items-center justify-center text-center text-white bg-black">
        <Image
          src="/hero.jpg"
          alt="Candles"
          layout="fill"
          objectFit="cover"
          className="opacity-70"
        />
        <div className="relative z-10">
          <h1 className="text-5xl md:text-6xl font-6xl">Handcrafted Candles for Every Moment</h1>
          <button className="mt-6 px-6 py-3 bg-black text-white border border-white rounded-full hover:bg-white hover:text-black">Shop Now</button>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-16 text-center">
        <h2 className="text-3xl font-bold">Featured Collections</h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            { name: "Rosette Radiance", price: "$30.00", image: "/hero.jpg" },
            { name: "Supreme Essence", price: "$30.00", image: "/candle2.jpg" },
            { name: "Candie", price: "$30.00", image: "/candle3.jpg" },
          ].map((item, index) => (
            <div key={index} className="bg-white p-4 shadow-lg rounded-lg">
              <Image src={item.image} alt={item.name} width={300} height={300} className="rounded-lg" />
              <h3 className="mt-4 text-xl font-semibold">{item.name}</h3>
              <p className="text-gray-600">{item.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 text-center bg-white">
        <h2 className="text-3xl font-bold">Why Choose Anaya Candles?</h2>
        <div className="mt-8 flex flex-wrap justify-center gap-8">
          {["100% Handmade", "Non-Toxic & Eco Friendly", "Unique Fragrances"].map((feature, index) => (
            <div key={index} className="flex flex-col items-center">
              <span className="text-3xl">✔️</span>
              <p className="mt-2 text-lg font-medium">{feature}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 text-center">
        <h2 className="text-3xl font-bold">Testimonials</h2>
        <p className="mt-4 italic max-w-xl mx-auto">"Absolutely love these candles! The scents are beautiful and long-lasting."</p>
      </section>
    </div>
  );
}
