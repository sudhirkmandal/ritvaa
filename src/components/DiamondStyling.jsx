import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const data = [
  "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=1200",
  "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=80&w=1200",
  "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1200",
  "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=1200",
];

const DiamondStackCarousel = () => {
  const [index, setIndex] = useState(0);

  const prev = () => {
    setIndex((p) => (p === 0 ? data.length - 1 : p - 1));
  };

  const next = () => {
    setIndex((p) => (p === data.length - 1 ? 0 : p + 1));
  };

  return (
    <section className="w-full py-20 bg-white">

      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-serif">
          Styling 101 With Diamonds
        </h2>
        <p className="text-gray-500 mt-2">
          Trendsetting diamond jewellery suited for every occasion
        </p>
      </div>

      {/* Carousel */}
      <div className="relative flex items-center justify-center">

        {/* Left Arrow */}
        <button
          onClick={prev}
          className="absolute left-5 z-20 bg-white shadow-lg p-3 rounded-full"
        >
          <ChevronLeft />
        </button>

        {/* Stack Container */}
        <div className="relative w-[320px] md:w-[500px] h-[420px] flex items-center justify-center">

          {/* LEFT BACK CARD */}
          <img
            src={data[(index + data.length - 1) % data.length]}
            className="absolute w-[70%] h-[80%] object-cover rounded-2xl shadow-xl -left-20 scale-90 opacity-60 blur-[1px]"
          />

          {/* RIGHT BACK CARD */}
          <img
            src={data[(index + 1) % data.length]}
            className="absolute w-[70%] h-[80%] object-cover rounded-2xl shadow-xl -right-20 scale-90 opacity-60 blur-[1px]"
          />

          {/* CENTER CARD */}
          <img
            src={data[index]}
            className="relative w-full h-full object-cover rounded-2xl shadow-2xl z-10 transition-all duration-500"
          />
        </div>

        {/* Right Arrow */}
        <button
          onClick={next}
          className="absolute right-5 z-20 bg-white shadow-lg p-3 rounded-full"
        >
          <ChevronRight />
        </button>

      </div>
    </section>
  );
};

export default DiamondStackCarousel;