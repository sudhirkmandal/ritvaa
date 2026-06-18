import React, { useState } from "react";

const allCategories = [
  {
    title: "EARRINGS",
    image:
      "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=80&w=1200",
    hoverImage:
      "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=1200",
  },
  {
    title: "FINGER RINGS",
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1200",
    hoverImage:
      "https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?q=80&w=1200",
  },
  {
    title: "PENDANTS",
    image:
      "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=1200",
    hoverImage:
      "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=1200",
  },
  {
    title: "MANGALSUTRA",
    image:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1200",
    hoverImage:
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?q=80&w=1200",
  },
  {
    title: "NECKLACES",
    image:
      "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=1200",
    hoverImage:
      "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=80&w=1200",
  },
  {
    title: "BRACELETS",
    image:
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?q=80&w=1200",
    hoverImage:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1200",
  },
  {
    title: "ANKLETS",
    image:
      "https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?q=80&w=1200",
    hoverImage:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1200",
  },
  {
    title: "GOLD COINS",
    image:
      "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=1200",
    hoverImage:
      "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=80&w=1200",
  },
];

const ShopByCategory = () => {
  const [showAll, setShowAll] = useState(false);

  const visibleCategories = showAll
    ? allCategories
    : allCategories.slice(0, 4);

  return (
    <section className="w-full py-14 bg-white">

      {/* HEADING */}
      <div className="text-center mb-10">
        <h2 style={{ color: "#8b1a1a" }} className="text-2xl  md:text-4xl font-serif tracking-wide">
          SHOP BY CATEGORY
        </h2>
        <p className="text-gray-500 mt-2 text-sm md:text-base">
          Explore our exclusive jewellery collections
        </p>
      </div>

      {/* GRID */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">

        {visibleCategories.map((cat, i) => (
          <div key={i} className="group cursor-pointer">

            <div className="relative overflow-hidden rounded-2xl bg-gray-100">

              {/* NORMAL IMAGE */}
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-[260px] object-cover transition-all duration-700 group-hover:opacity-0 group-hover:scale-110"
              />

              {/* HOVER IMAGE */}
              <img
                src={cat.hoverImage}
                alt={cat.title}
                className="absolute inset-0 w-full h-[260px] object-cover opacity-0 scale-110 transition-all duration-700 group-hover:opacity-100 group-hover:scale-100"
              />
            </div>

            <h3 className="text-center mt-4 text-sm md:text-base font-medium tracking-[2px]">
              {cat.title}
            </h3>

          </div>
        ))}

      </div>

      {/* VIEW ALL BUTTON */}
      <div className="text-center mt-12">
        <button
          onClick={() => setShowAll(!showAll)}
          className="px-10 py-3 border border-black text-black text-sm tracking-widest uppercase hover:bg-black hover:text-white transition-all duration-300"
        >
          {showAll ? "VIEW LESS" : "VIEW ALL"}
        </button>
      </div>

    </section>
  );
};

export default ShopByCategory;