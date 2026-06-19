import { useState } from "react";
import { Link } from "react-router-dom";

// ── DATA ────────────────────────────────────────────────────────────────────

const rings = [
  { id: 1, name: "The R Alphabet Diamond Ring", price: 40683, old: 46202, discount: true, img: "https://i.pinimg.com/1200x/cc/1b/15/cc1b15e7cb949a9281f24c9ce2e1305b.jpg" },
  { id: 3, name: "The Kennet Diamond Ring", price: 40489, old: 46700, discount: true, img: "https://i.pinimg.com/1200x/50/74/97/507497614631825cd8cd40092f67246f.jpg" },
  { id: 4, name: "The Akira Diamond Ring", price: 25998, old: 29076, discount: true, img: "https://i.pinimg.com/736x/c4/9c/ac/c49cace318b395c4f904e34fa7313a75.jpg" },
  { id: 41, name: "The Celeste Solitaire Ring", price: 32500, old: 38000, discount: true, img: "https://images.pexels.com/photos/691046/pexels-photo-691046.jpeg?auto=compress&cs=tinysrgb&w=400" },
  { id: 42, name: "The Aria Gold Ring", price: 18200, old: 21000, discount: true, img: "https://i.pinimg.com/736x/39/40/64/39406423b4b209a6766274ddc4bf83c7.jpg" },
  { id: 43, name: "The Prism Diamond Ring", price: 55900, old: 63000, discount: true, img: "https://i.pinimg.com/1200x/2a/27/52/2a275253e01a983ef1fbb8c0d788cc4e.jpg" },
  { id: 44, name: "The Lotus Eternity Ring", price: 29400, old: 34500, discount: true, img: "https://i.pinimg.com/736x/a6/dc/7c/a6dc7cdecd4f562a09ed3eade2bffb81.jpg" },
];

const mangalsutra = [
  { id: 5, name: "The Priya Gold Mangalsutra", price: 22450, old: 26000, discount: true, img: "https://i.pinimg.com/1200x/3d/68/4e/3d684e51c20c3af4fe778bd7141505c8.jpg" },
  { id: 6, name: "The Divya Diamond Mangalsutra", price: 35800, old: 41200, discount: true, img: "https://i.pinimg.com/1200x/ff/7b/ed/ff7bed456d0e1982853c5e69d62b049a.jpg" },
  { id: 7, name: "The Ananya Gold Mangalsutra", price: 18990, old: 22000, discount: true, img: "https://i.pinimg.com/1200x/3a/ab/c3/3aabc3282afd320e74c929eaa420a3fc.jpg" },
  { id: 8, name: "The Kavya Diamond Mangalsutra", price: 48500, old: 55000, discount: true, img: "https://i.pinimg.com/1200x/35/b3/89/35b3894f826d948c7252951c58fa945f.jpg" },
  { id: 51, name: "The Shruti Classic Mangalsutra", price: 15600, old: 18500, discount: true, img: "https://i.pinimg.com/1200x/09/c9/9d/09c99d53b984d6a5a1fd37f32862bd8a.jpg" },
  { id: 52, name: "The Mehal Gold Mangalsutra", price: 28900, old: 33000, discount: true, img: "https://i.pinimg.com/1200x/bb/b3/15/bbb315c5fcfbece2a6bbfe55a3536e82.jpg" },
  { id: 53, name: "The Rudra Diamond Mangalsutra", price: 62000, old: 72000, discount: true, img: "https://i.pinimg.com/1200x/63/6b/28/636b2843efa0de1157c9192e0d7ef671.jpg" },
  { id: 54, name: "The Veda Pearl Mangalsutra", price: 11200, old: 13500, discount: true, img: "https://i.pinimg.com/736x/c6/8c/f3/c68cf3832871465259531d51e457d817.jpg" },
];

const earrings = [
  { id: 9, name: "The Meera Diamond Earring", price: 15200, old: 18000, discount: true, img: "https://i.pinimg.com/1200x/dc/09/c5/dc09c567e4fcc1b05ef1fafac92b6f83.jpg" },
  { id: 10, name: "The Aisha Gold Earring", price: 9800, old: 11500, discount: true, img: "https://i.pinimg.com/1200x/bf/5c/f5/bf5cf50ae8304079da849f6a26a17c8e.jpg" },
  { id: 11, name: "The Tara Diamond Drops", price: 21600, old: 25000, discount: true, img: "https://i.pinimg.com/1200x/eb/40/85/eb408588bffccddd9d7535e96607f2be.jpg" },
  { id: 12, name: "The Luna Stud Earring", price: 7450, old: 8900, discount: true, img: "https://i.pinimg.com/1200x/f7/84/82/f784828665bcdec7b17e1fdf7607357b.jpg" },
  { id: 61, name: "The Zara Jhumka Earring", price: 12400, old: 14800, discount: true, img: "https://i.pinimg.com/736x/de/73/e6/de73e672680ab4480a4326bcab6fd40a.jpg" },
  { id: 62, name: "The Ishaan Gold Chandbali", price: 18900, old: 22500, discount: true, img: "https://i.pinimg.com/1200x/ca/72/6d/ca726db03fdcb2538eb97eb900ee202c.jpg" },
  { id: 63, name: "The Diya Pearl Drop Earring", price: 8600, old: 10200, discount: true, img: "https://i.pinimg.com/1200x/69/d2/3d/69d23d0cd897f7c45654c60a9fac2786.jpg" },
  { id: 64, name: "The Vanya Hoop Earring", price: 14300, old: 17000, discount: true, img: "https://i.pinimg.com/1200x/08/a0/d9/08a0d9b5a1f1033bb441a117c603eee1.jpg" },
];

const chains = [
  { id: 13, name: "The Heritage Gold Chain", price: 32100, old: 37500, discount: true, img: "https://i.pinimg.com/1200x/d8/8e/d1/d88ed127b52320b519aefa7a9c59827c.jpg" },
  { id: 14, name: "The Milano Diamond Chain", price: 55000, old: 63000, discount: true, img: "https://i.pinimg.com/736x/2f/37/6a/2f376ace423aaa9df3daee883dd15d24.jpg" },
  { id: 15, name: "The Classic Gold Chain", price: 18750, old: 22000, discount: true, img: "https://i.pinimg.com/1200x/db/b8/0b/dbb80bbda648311d15430582c18d00b8.jpg" },
  { id: 16, name: "The Venezia Link Chain", price: 42300, old: 49000, discount: true, img: "https://i.pinimg.com/1200x/8d/b3/78/8db3788d101c411d6b1d33c17b2a78ab.jpg" },
  { id: 71, name: "The Regal Rope Gold Chain", price: 27800, old: 32500, discount: true, img: "https://i.pinimg.com/1200x/c8/45/c1/c845c167a973b77beee4f32505913a54.jpg" },
  { id: 72, name: "The Infinity Diamond Chain", price: 61000, old: 70000, discount: true, img: "https://i.pinimg.com/1200x/73/cb/c4/73cbc4359dffed655e8bac7fef9b986b.jpg" },
  { id: 73, name: "The Flat Curb Gold Chain", price: 15500, old: 18000, discount: true, img: "https://i.pinimg.com/1200x/70/e9/49/70e949242dcb3d97cba96e12de9436ee.jpg" },
  { id: 74, name: "The Box Link Chain", price: 22100, old: 26500, discount: true, img: "https://i.pinimg.com/1200x/1c/5e/5f/1c5e5f6af395012d937ca5ac51d6a251.jpg" },
];

const bracelets = [
  { id: 17, name: "The Selene Diamond Bracelet", price: 28900, old: 33500, discount: true, img: "https://i.pinimg.com/736x/c7/ec/bb/c7ecbb751c3e9d39bd452ee1171bf11f.jpg" },
  { id: 18, name: "The Aurora Gold Bracelet", price: 19600, old: 23000, discount: true, img: "https://i.pinimg.com/736x/8d/4a/fb/8d4afbd20787ea9fcfc32846bf378197.jpg" },
  { id: 19, name: "The Nova Diamond Bracelet", price: 37200, old: 43000, discount: true, img: "https://i.pinimg.com/1200x/a1/a9/2c/a1a92cc9bfd400f7d430436131113cef.jpg" },
  { id: 20, name: "The Elara Charm Bracelet", price: 14500, old: 17200, discount: true, img: "https://i.pinimg.com/1200x/62/43/5a/62435adf78b78a8d2ab3a566ad1afa87.jpg" },
  { id: 81, name: "The Estelle Tennis Bracelet", price: 45600, old: 52000, discount: true, img: "https://i.pinimg.com/1200x/40/57/6e/40576e8e91a1d0368fab21d5a92f6c40.jpg" },
  { id: 82, name: "The Bliss Gold Bangle Bracelet", price: 16800, old: 19500, discount: true, img: "https://i.pinimg.com/1200x/64/5d/46/645d46663e62943f936a6b4f72c2801c.jpg" },
  { id: 83, name: "The Celeste Kada Bracelet", price: 31200, old: 36000, discount: true, img: "https://i.pinimg.com/1200x/75/d7/4e/75d74e3ac56e5e5f79dc2f15648c2884.jpg" },
  { id: 84, name: "The Bloom Diamond Bracelet", price: 52000, old: 60000, discount: true, img: "https://i.pinimg.com/1200x/0a/d2/75/0ad2758b4eaa582596ebf406ef16ee5f.jpg" },
];

const categories = [
  { key: "rings", label: "RINGS", data: rings },
  { key: "mangalsutra", label: "MANGALSUTRA", data: mangalsutra },
  { key: "earring", label: "EARRING", data: earrings },
  { key: "chain", label: "CHAIN", data: chains },
  { key: "bracelets", label: "BRACELETS", data: bracelets },
];

const VISIBLE_COUNT = 4;
const fmt = (n) => "₹" + n.toLocaleString("en-IN");

// ── ICONS ────────────────────────────────────────────────────────────────────

function HeartIcon({ filled }) {
  return filled ? (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  );
}

// ── PRODUCT CARD ─────────────────────────────────────────────────────────────

function ProductCard({ item, liked, onToggleLike }) {
  const [imgError, setImgError] = useState(false);
  const discountPct = Math.round(((item.old - item.price) / item.old) * 100);

  return (
    <div
      className="group relative overflow-hidden cursor-pointer flex flex-col transition-all duration-300"
      style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e8dcc8" }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = "#c9a96e"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(139,26,26,0.08)"; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = "#e8dcc8"; e.currentTarget.style.boxShadow = "none"; }}
    >
      {/* Wishlist */}
      <button
        onClick={() => onToggleLike(item.id)}
        className="absolute top-3 left-3 z-10 p-1.5 rounded-full transition-all duration-200 hover:scale-110"
        style={{ backgroundColor: "rgba(255,255,255,0.85)", border: "1px solid #e8dcc8", color: liked ? "#8b1a1a" : "#c9a96e" }}
        aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
      >
        <HeartIcon filled={liked} />
      </button>

      {/* Image */}
      <div className="flex items-center justify-center overflow-hidden" style={{ height: "200px", backgroundColor: "#faf6f0" }}>
        {!imgError ? (
          <img
            src={item.img}
            alt={item.name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="flex flex-col items-center justify-center gap-2" style={{ color: "#c9a96e" }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-xs" style={{ color: "#b0a090" }}>Image unavailable</span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-3 flex flex-col gap-1 flex-1">
        <p className="text-sm font-medium truncate" style={{ color: "#4a3728" }} title={item.name}>
          {item.name}
        </p>
        <div className="flex items-center gap-2 flex-wrap mt-1">
          <span className="text-sm font-semibold" style={{ color: "#2d1f17" }}>{fmt(item.price)}</span>
          <span className="text-xs line-through" style={{ color: "#b0a090" }}>{fmt(item.old)}</span>
        </div>
        {item.discount && (
          <p className="text-xs font-medium mt-0.5" style={{ color: "#8b1a1a" }}>{discountPct}% off on product</p>
        )}
      </div>
    </div>
  );
}

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────

export default function BestSellers() {
  const [activeCategory, setActiveCategory] = useState("rings");
  const [showAll, setShowAll] = useState(false);
  const [liked, setLiked] = useState(new Set());

  const toggleLike = (id) => {
    setLiked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleCategoryChange = (key) => {
    setActiveCategory(key);
    setShowAll(false);
  };

  const allData = categories.find((c) => c.key === activeCategory)?.data || [];
  const visibleData = showAll ? allData : allData.slice(0, VISIBLE_COUNT);
  const hiddenCount = allData.length - VISIBLE_COUNT;

  return (
    <section className="w-full px-4 py-10" style={{ backgroundColor: "#fdf8f2" }}>
      <div className="max-w-6xl mx-auto">

        {/* ── Title ── */}
        <div className="text-center mb-8">
          <h2
            className="text-2xl sm:text-3xl font-semibold tracking-widest uppercase mb-3"
            style={{ color: "#8b1a1a", fontFamily: "Georgia, serif", letterSpacing: "0.15em" }}
          >
            Best Sellers
          </h2>
          <div className="mx-auto rounded-full" style={{ width: "64px", height: "2px", backgroundColor: "#c9a96e" }} />
        </div>

        {/* ── Category Tabs ── */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => handleCategoryChange(cat.key)}
              className="px-4 py-2 rounded-full text-xs sm:text-sm font-medium tracking-wide transition-all duration-200 focus:outline-none"
              style={
                activeCategory === cat.key
                  ? { backgroundColor: "#8b1a1a", color: "#fff", border: "1px solid #8b1a1a" }
                  : { backgroundColor: "#ffffff", color: "#8b1a1a", border: "1px solid #c9a96e" }
              }
              onMouseEnter={e => { if (activeCategory !== cat.key) e.currentTarget.style.backgroundColor = "#fdf3e3"; }}
              onMouseLeave={e => { if (activeCategory !== cat.key) e.currentTarget.style.backgroundColor = "#ffffff"; }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* ── Products Grid ── */}
        <Link to="/bestseller" onClick={() => window.scrollTo(0, 0)}>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
            {visibleData.map((item) => (
              <ProductCard
                key={item.id}
                item={item}
                liked={liked.has(item.id)}
                onToggleLike={toggleLike}
              />
            ))}
          </div></Link>

        {/* ── View All / Show Less ── */}
        <div className="flex flex-col items-center mt-10 gap-2">
          {!showAll ? (
            <>
              <p className="text-sm" style={{ color: "#9a8070" }}>
                Showing {VISIBLE_COUNT} of {allData.length} products
              </p>
              <button
                onClick={() => setShowAll(true)}
                className="flex items-center gap-2 px-8 py-3 rounded-full text-sm font-medium tracking-widest uppercase transition-all duration-200 hover:shadow-md active:scale-95"
                style={{ backgroundColor: "#8b1a1a", color: "#fff", border: "1px solid #8b1a1a", letterSpacing: "0.1em" }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#6e1414"; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = "#8b1a1a"; }}
              >
                View All {categories.find(c => c.key === activeCategory)?.label}
                <ArrowRightIcon />
              </button>
            </>
          ) : (
            <button
              onClick={() => { setShowAll(false); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="flex items-center gap-2 px-8 py-3 rounded-full text-sm font-medium tracking-widest uppercase transition-all duration-200 hover:shadow-md active:scale-95"
              style={{ backgroundColor: "transparent", color: "#8b1a1a", border: "1px solid #8b1a1a", letterSpacing: "0.1em" }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#fdf3e3"; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; }}
            >
              Show Less
            </button>
          )}
        </div>

      </div>
    </section>
  );
}