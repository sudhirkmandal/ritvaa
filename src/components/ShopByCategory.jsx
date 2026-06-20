import React, { useState } from "react";

const allCategories = [
  {
    title: "EARRINGS",
    image:
      "https://i.pinimg.com/736x/f2/b2/3c/f2b23cd81690a16e57a2359436f6933d.jpg",
    hoverImage:
      "https://i.pinimg.com/736x/66/14/f1/6614f19e08e4ef6f4927cbc79181490b.jpg",
  },
  {
    title: "FINGER RINGS",
    image:
      "https://i.pinimg.com/1200x/6f/52/79/6f52796ccfba8936d13d651f8381f54d.jpg",
    hoverImage:
      "https://i.pinimg.com/736x/36/cb/9a/36cb9abf2b6d981e141cbe9559172f1a.jpg",
  },
  {
    title: "PENDANTS",
    image:
      "https://i.pinimg.com/1200x/47/0b/75/470b75e419b065314abaecdff093781a.jpg",
    hoverImage:
      "https://i.pinimg.com/736x/2f/37/6a/2f376ace423aaa9df3daee883dd15d24.jpg",
  },
  {
    title: "MANGALSUTRA",
    image:
      "https://i.pinimg.com/1200x/bb/b3/15/bbb315c5fcfbece2a6bbfe55a3536e82.jpg",
    hoverImage:
      "https://i.pinimg.com/1200x/21/a4/be/21a4be4812e702adae62612f769c607f.jpg",
  },
  {
    title: "NECKLACES",
    image:
      "https://i.pinimg.com/1200x/57/4a/f3/574af3c4805f676705abdafde514fc39.jpg",
    hoverImage:
      "https://i.pinimg.com/1200x/22/98/ab/2298abd4e4f7a885956401e02d191166.jpg",
  },
  {
    title: "BRACELETS",
    image:
      "https://i.pinimg.com/736x/60/1c/22/601c22b322148bad7855f41790261b76.jpg",
    hoverImage:
      "https://i.pinimg.com/1200x/10/e7/d0/10e7d0e2ca2c4e4450b548583cc115a0.jpg",
  },
  {
    title: "ANKLETS",
    image:
      "https://i.pinimg.com/1200x/c6/a7/a2/c6a7a241774ce20a7e7b383034484f9f.jpg",
    hoverImage:
      "https://i.pinimg.com/1200x/bf/1a/53/bf1a53fff8756542d6015f2bd4fefc04.jpg",
  },
  {
    title: "GOLD COINS",
    image:
      "https://i.pinimg.com/1200x/e0/fd/4f/e0fd4f5c3bc1629146e0b5c3a29f8810.jpg",
    hoverImage:
      "https://i.pinimg.com/1200x/37/47/29/37472997c5952399b251e852a3fcb6b3.jpg",
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