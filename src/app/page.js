import Image from "next/image";

export default function Home() {
  return (
    <div className="font-serif bg-[#FAF7F2] text-gray-900">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] sm:h-screen flex items-center justify-center text-center text-white bg-black">
  <Image
    src="/hero.JPG"
    alt="Candles"
    layout="fill"
    objectFit="cover"
    objectPosition="center top"
    className="opacity-70"
  />
  <div className="relative z-10 px-4">
    <h1 className="text-3xl sm:text-5xl md:text-6xl font-3xl">
      Handcrafted Candles for Every Moment
    </h1>
    <button className="mt-6 px-6 py-3 text-white border border-white rounded-full hover:bg-white hover:text-black">
      Shop Now
    </button>
  </div>
</section>


      {/* Featured Collections */}
      <section className="py-12 text-center">
  <h2 className="text-2xl sm:text-3xl font-bold">Featured Collections</h2>
  
  {/* Scrollable container for mobile */}
  <div className="mt-8 overflow-x-auto">
    <div className="flex sm:grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4 sm:px-0">
      {[
        { name: "Rosette Radiance", price: "$30.00", image: "/hero.JPG" },
        { name: "Supreme Essence", price: "$30.00", image: "/hero.JPG" },
        { name: "Candie", price: "$30.00", image: "/hero.JPG" },
      ].map((item, index) => (
        <div key={index} className="bg-white p-4 shadow-lg rounded-lg min-w-[250px] sm:w-auto">
          <Image
            src={item.image}
            alt={item.name}
            width={300}
            height={300}
            className="rounded-lg w-full h-auto"
          />
          <h3 className="mt-4 text-lg sm:text-xl font-semibold">{item.name}</h3>
          <p className="text-gray-600 text-sm sm:text-base">{item.price}</p>
        </div>
      ))}
    </div>
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
