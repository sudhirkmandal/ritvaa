import { Link } from "react-router-dom";
import { useState, useMemo } from "react";

// ── DATA ─────────────────────────────────────────────────────────────────────
const products = [
  { id: 1, name: "Crystal Love Bangle Bracelet", price: 2659, old: 4298, discount: 38, rating: 4.5, reviews: 1431, badge: "Buy 1 Get 1", category: "Bracelets", img: "https://i.pinimg.com/1200x/0a/fd/1a/0afd1aeabd370fdcbef50f7d33f099e9.jpg" },
  { id: 2, name: "Athena Solitaire Hoop Earrings", price: 2258, old: 3642, discount: 38, rating: 4.5, reviews: 1212, badge: "Buy 1 Get 1", category: "Earrings", img: "https://i.pinimg.com/1200x/eb/40/85/eb408588bffccddd9d7535e96607f2be.jpg" },
  { id: 3, name: "Diamond Affair Bracelet", price: 2533, old: 4086, discount: 38, rating: 4.5, reviews: 675, badge: "Buy 1 Get 1", category: "Bracelets", img: "https://i.pinimg.com/1200x/51/6b/9b/516b9b2e56d074561cc7c97c0494cce2.jpg" },
  { id: 4, name: "Round Solitaire Necklace", price: 2799, old: 4514, discount: 38, rating: 4, reviews: 984, badge: "Buy 1 Get 1", category: "Necklaces", img: "https://i.pinimg.com/1200x/3b/83/bb/3b83bb484e7551c92e97ef09e6991913.jpg" },
  { id: 5, name: "Classic Emerald Necklace", price: 2223, old: 3585, discount: 38, rating: 5, reviews: 865, badge: "Buy 1 Get 1", category: "Necklaces", img: "https://i.pinimg.com/1200x/d3/42/73/d3427361920dcef5d0a90a76a195e052.jpg" },
  { id: 6, name: "Diamond Huggie Hoop Earrings", price: 2346, old: 3784, discount: 38, rating: 4.5, reviews: 747, badge: "Buy 1 Get 1", category: "Earrings", img: "https://i.pinimg.com/1200x/95/90/80/959080e030982408fa9928abff8f30b9.jpg" },
  { id: 7, name: "Nail Bangle Bracelet", price: 2258, old: 3642, discount: 38, rating: 4.5, reviews: 712, badge: "Buy 1 Get 1", category: "Bracelets", img: "https://i.pinimg.com/736x/7c/5e/57/7c5e5717e7f0568286a65c65edc21e26.jpg" },
  { id: 8, name: "Delicate Diamond Studded Necklace", price: 2113, old: 3408, discount: 38, rating: 4.5, reviews: 586, badge: "Buy 1 Get 1", category: "Necklaces", img: "https://i.pinimg.com/1200x/87/73/43/87734360a06a8e20bee25bd1a843b62c.jpg" },
  { id: 9, name: "Multi Stone Q Clasp Bracelet", price: 2258, old: 3642, discount: 38, rating: 4, reviews: 459, badge: "Buy 1 Get 1", category: "Bracelets", img: "https://i.pinimg.com/1200x/87/02/99/870299a33269aaa24fc4977d4da27689.jpg" },
  { id: 10, name: "Rope Chain | 6 MM", price: 2633, old: 4247, discount: 38, rating: 4.5, reviews: 377, badge: "Buy 1 Get 1", category: "Chains", img: "https://i.pinimg.com/1200x/ad/72/97/ad7297c2cd732f176b24dae2b8c32184.jpg" },
  { id: 11, name: "Tree of Life Necklace", price: 2508, old: 4045, discount: 38, rating: 4.5, reviews: 556, badge: "Buy 1 Get 1", category: "Necklaces", img: "https://i.pinimg.com/1200x/03/c2/10/03c210d6aeb458dd91b133de824899b0.jpg" },
  { id: 12, name: "Golden Orb Set", price: 2265, old: 3653, discount: 38, rating: 4, reviews: 518, badge: "Buy 1 Get 1", category: "Rings", img: "https://i.pinimg.com/1200x/e0/6f/e4/e06fe4c1a4a0119c749cf14c727a7822.jpg" },
  { id: 13, name: "Pearl Drop Pendant Necklace", price: 1899, old: 3064, discount: 38, rating: 4.5, reviews: 293, badge: "Buy 1 Get 1", category: "Necklaces", img: "https://i.pinimg.com/1200x/4e/27/dc/4e27dcede8f853e836533bde87d1193c.jpg" },
  { id: 14, name: "Twisted Infinity Ring", price: 1749, old: 2820, discount: 38, rating: 4, reviews: 412, badge: "Buy 1 Get 1", category: "Rings", img: "https://i.pinimg.com/1200x/c9/a9/5d/c9a95de50d007dcff89f8a5d442a8987.jpg" },
  { id: 15, name: "Celestial Star Chain Bracelet", price: 2099, old: 3385, discount: 38, rating: 5, reviews: 621, badge: "Buy 1 Get 1", category: "Bracelets", img: "https://i.pinimg.com/1200x/70/5a/12/705a123bfd1d4eb9123addd4e601beb6.jpg" },
  { id: 16, name: "Floral Gold Stud Earrings", price: 1599, old: 2580, discount: 38, rating: 4.5, reviews: 339, badge: "Buy 1 Get 1", category: "Earrings", img: "https://i.pinimg.com/1200x/cb/11/ac/cb11ac04f423a18b5d0d368eb9a2bc17.jpg" },
];

const ALL_CATEGORIES = ["Bracelets", "Earrings", "Necklaces", "Rings", "Chains"];
const PRICE_RANGES = [
  { label: "Under ₹2,000", min: 0, max: 2000 },
  { label: "₹2,000 – ₹2,500", min: 2000, max: 2500 },
  { label: "₹2,500 – ₹3,000", min: 2500, max: 3000 },
  { label: "Above ₹3,000", min: 3000, max: Infinity },
];
const RATINGS = [5, 4, 3];
const SORT_OPTIONS = [
  { value: "default", label: "Default" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
  { value: "popular", label: "Most Popular" },
];

const fmt = (n) => "₹ " + n.toLocaleString("en-IN") + ".00";

// ── STAR RATING ───────────────────────────────────────────────────────────────
function StarRating({ rating, size = 13 }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => {
        const filled = rating >= s;
        const half = !filled && rating >= s - 0.5;
        return (
          <svg key={s} viewBox="0 0 20 20" style={{ width: size, height: size, flexShrink: 0 }}>
            <defs>
              <linearGradient id={`hg${s}${size}`}>
                <stop offset="50%" stopColor="#e6a817" />
                <stop offset="50%" stopColor="#d4c5a9" />
              </linearGradient>
            </defs>
            <polygon
              points="10,1 12.9,7 19.5,7.6 14.5,12 16.2,18.5 10,15 3.8,18.5 5.5,12 0.5,7.6 7.1,7"
              fill={filled ? "#e6a817" : half ? `url(#hg${s}${size})` : "#d4c5a9"}
            />
          </svg>
        );
      })}
    </div>
  );
}

// ── FILTER SECTION ACCORDION ──────────────────────────────────────────────────
function FilterSection({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ borderBottom: "1px solid #ede8e0" }}>
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between py-3 text-left focus:outline-none"
        style={{ background: "none", border: "none", cursor: "pointer" }}
      >
        <span className="text-sm font-semibold uppercase tracking-wider" style={{ color: "#1a0a05", letterSpacing: "0.1em" }}>{title}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
          strokeWidth={2} stroke="#8b1a1a"
          style={{ width: 16, height: 16, transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>
      {open && <div className="pb-4">{children}</div>}
    </div>
  );
}

// ── PRODUCT CARD ──────────────────────────────────────────────────────────────
function ProductCard({ product }) {
  const [imgErr, setImgErr] = useState(false);
  const [inCart, setInCart] = useState(false);

  return (
    <div
      className="flex flex-col bg-white group"
      style={{ border: "1px solid #ede8e0", borderRadius: "8px", overflow: "hidden", transition: "box-shadow 0.25s" }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = "0 6px 24px rgba(139,90,30,0.12)"}
      onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: "1/1", backgroundColor: "#faf6f0" }}>
        <span
          className="absolute top-2 left-2 z-10 text-white px-2 py-0.5 rounded"
          style={{ fontSize: "10px", fontWeight: 600, backgroundColor: "#2a7a3b", letterSpacing: "0.04em" }}
        >
          {product.badge}
        </span>
        <span
          className="absolute top-2 right-2 z-10 px-2 py-0.5 rounded text-white"
          style={{ fontSize: "10px", fontWeight: 600, backgroundColor: "#8b1a1a" }}
        >
          {product.category}
        </span>
        {!imgErr ? (
          <img
            src={product.img}
            alt={product.name}
            onError={() => setImgErr(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center" style={{ color: "#c9a96e" }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1.5 p-3 flex-1">
        <p className="text-sm font-medium leading-snug" style={{ color: "#1a1a1a" }}>{product.name}</p>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-semibold" style={{ color: "#1a1a1a" }}>{fmt(product.price)}</span>
          <span className="text-xs line-through" style={{ color: "#999" }}>{fmt(product.old)}</span>
          <span className="text-xs font-semibold" style={{ color: "#c0392b" }}>({product.discount}%)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <StarRating rating={product.rating} />
          <span className="text-xs" style={{ color: "#888" }}>({product.reviews.toLocaleString()})</span>
        </div>
        <button
          onClick={() => setInCart(true)}
          className="mt-auto w-full py-2 text-xs font-semibold tracking-widest uppercase transition-all duration-200 focus:outline-none"
          style={{
            backgroundColor: inCart ? "#8b1a1a" : "#fff",
            color: inCart ? "#fff" : "#1a1a1a",
            border: "1px solid #c8bfb0",
            borderRadius: "4px",
            letterSpacing: "0.08em",
            cursor: "pointer",
          }}
          onMouseEnter={e => { if (!inCart) { e.currentTarget.style.backgroundColor = "#1a0a05"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "#1a0a05"; } }}
          onMouseLeave={e => { if (!inCart) { e.currentTarget.style.backgroundColor = "#fff"; e.currentTarget.style.color = "#1a1a1a"; e.currentTarget.style.borderColor = "#c8bfb0"; } }}
        >
          {inCart ? "✓ Added to Cart" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}

// ── SIDEBAR FILTERS ───────────────────────────────────────────────────────────
function Sidebar({ filters, onChange, onClear, totalResults }) {
  const { categories, priceRange, minRating } = filters;

  const toggleCategory = (cat) => {
    const next = categories.includes(cat)
      ? categories.filter(c => c !== cat)
      : [...categories, cat];
    onChange({ ...filters, categories: next });
  };

  const activeCount = categories.length + (priceRange !== null ? 1 : 0) + (minRating !== null ? 1 : 0);

  return (
    <aside style={{ minWidth: 220, maxWidth: 240, width: "100%" }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-base font-bold uppercase tracking-wider" style={{ color: "#1a0a05" }}>Filters</h2>
          <p className="text-xs mt-0.5" style={{ color: "#9a8070" }}>{totalResults} products found</p>
        </div>
        {activeCount > 0 && (
          <button
            onClick={onClear}
            className="text-xs font-semibold px-3 py-1 rounded-full focus:outline-none transition-colors"
            style={{ backgroundColor: "#fdf0e0", color: "#8b1a1a", border: "1px solid #e8c89a", cursor: "pointer" }}
          >
            Clear All ({activeCount})
          </button>
        )}
      </div>

      <div style={{ backgroundColor: "#fff", borderRadius: "10px", border: "1px solid #ede8e0", padding: "0 16px" }}>

        {/* Categories */}
        <FilterSection title="Category">
          <div className="flex flex-col gap-2">
            {ALL_CATEGORIES.map(cat => (
              <label key={cat} className="flex items-center gap-2.5 cursor-pointer group/label">
                <div
                  onClick={() => toggleCategory(cat)}
                  className="flex items-center justify-center transition-all duration-150"
                  style={{
                    width: 18, height: 18, borderRadius: 4, flexShrink: 0, cursor: "pointer",
                    border: categories.includes(cat) ? "2px solid #8b1a1a" : "2px solid #d0c4b4",
                    backgroundColor: categories.includes(cat) ? "#8b1a1a" : "#fff",
                  }}
                >
                  {categories.includes(cat) && (
                    <svg viewBox="0 0 12 12" style={{ width: 10, height: 10 }}>
                      <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth={1.8} fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <span
                  onClick={() => toggleCategory(cat)}
                  className="text-sm select-none"
                  style={{ color: categories.includes(cat) ? "#8b1a1a" : "#4a3728", fontWeight: categories.includes(cat) ? 600 : 400, cursor: "pointer" }}
                >
                  {cat}
                </span>
                <span className="ml-auto text-xs" style={{ color: "#b0a090" }}>
                  ({products.filter(p => p.category === cat).length})
                </span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Price Range */}
        <FilterSection title="Price Range">
          <div className="flex flex-col gap-2">
            {PRICE_RANGES.map((range, i) => (
              <label key={i} className="flex items-center gap-2.5 cursor-pointer">
                <div
                  onClick={() => onChange({ ...filters, priceRange: priceRange === i ? null : i })}
                  className="flex items-center justify-center transition-all duration-150"
                  style={{
                    width: 18, height: 18, borderRadius: "50%", flexShrink: 0, cursor: "pointer",
                    border: priceRange === i ? "2px solid #8b1a1a" : "2px solid #d0c4b4",
                    backgroundColor: priceRange === i ? "#8b1a1a" : "#fff",
                  }}
                >
                  {priceRange === i && (
                    <div style={{ width: 7, height: 7, borderRadius: "50%", backgroundColor: "#fff" }} />
                  )}
                </div>
                <span
                  onClick={() => onChange({ ...filters, priceRange: priceRange === i ? null : i })}
                  className="text-sm select-none"
                  style={{ color: priceRange === i ? "#8b1a1a" : "#4a3728", fontWeight: priceRange === i ? 600 : 400, cursor: "pointer" }}
                >
                  {range.label}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Rating */}
        <FilterSection title="Customer Rating" defaultOpen={true}>
          <div className="flex flex-col gap-2">
            {RATINGS.map(r => (
              <label key={r} className="flex items-center gap-2.5 cursor-pointer">
                <div
                  onClick={() => onChange({ ...filters, minRating: minRating === r ? null : r })}
                  className="flex items-center justify-center transition-all duration-150"
                  style={{
                    width: 18, height: 18, borderRadius: 4, flexShrink: 0, cursor: "pointer",
                    border: minRating === r ? "2px solid #8b1a1a" : "2px solid #d0c4b4",
                    backgroundColor: minRating === r ? "#8b1a1a" : "#fff",
                  }}
                >
                  {minRating === r && (
                    <svg viewBox="0 0 12 12" style={{ width: 10, height: 10 }}>
                      <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth={1.8} fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <div
                  className="flex items-center gap-1 cursor-pointer"
                  onClick={() => onChange({ ...filters, minRating: minRating === r ? null : r })}
                >
                  <StarRating rating={r} size={12} />
                  <span className="text-xs" style={{ color: "#9a8070" }}>&amp; above</span>
                </div>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Discount */}
        <FilterSection title="Discount" defaultOpen={false}>
          <div className="flex flex-col gap-2">
            {[10, 20, 30, 38].map(d => (
              <label key={d} className="flex items-center gap-2.5 cursor-pointer">
                <div
                  onClick={() => onChange({ ...filters, minDiscount: filters.minDiscount === d ? null : d })}
                  className="flex items-center justify-center transition-all duration-150"
                  style={{
                    width: 18, height: 18, borderRadius: 4, flexShrink: 0, cursor: "pointer",
                    border: filters.minDiscount === d ? "2px solid #8b1a1a" : "2px solid #d0c4b4",
                    backgroundColor: filters.minDiscount === d ? "#8b1a1a" : "#fff",
                  }}
                >
                  {filters.minDiscount === d && (
                    <svg viewBox="0 0 12 12" style={{ width: 10, height: 10 }}>
                      <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth={1.8} fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <span
                  onClick={() => onChange({ ...filters, minDiscount: filters.minDiscount === d ? null : d })}
                  className="text-sm select-none"
                  style={{ color: filters.minDiscount === d ? "#8b1a1a" : "#4a3728", fontWeight: filters.minDiscount === d ? 600 : 400, cursor: "pointer" }}
                >
                  {d}% &amp; above
                </span>
              </label>
            ))}
          </div>
        </FilterSection>

      </div>
    </aside>
  );
}

// ── ACTIVE FILTER CHIPS ───────────────────────────────────────────────────────
function ActiveChips({ filters, onChange }) {
  const chips = [];
  filters.categories.forEach(c => chips.push({ label: c, remove: () => onChange({ ...filters, categories: filters.categories.filter(x => x !== c) }) }));
  if (filters.priceRange !== null) chips.push({ label: PRICE_RANGES[filters.priceRange].label, remove: () => onChange({ ...filters, priceRange: null }) });
  if (filters.minRating !== null) chips.push({ label: `${filters.minRating}★ & above`, remove: () => onChange({ ...filters, minRating: null }) });
  if (filters.minDiscount !== null) chips.push({ label: `${filters.minDiscount}%+ Off`, remove: () => onChange({ ...filters, minDiscount: null }) });
  if (!chips.length) return null;
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {chips.map((chip, i) => (
        <span
          key={i}
          className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full"
          style={{ backgroundColor: "#fdf0e0", color: "#8b1a1a", border: "1px solid #e8c89a" }}
        >
          {chip.label}
          <button onClick={chip.remove} style={{ background: "none", border: "none", cursor: "pointer", color: "#8b1a1a", padding: 0, lineHeight: 1 }}>✕</button>
        </span>
      ))}
    </div>
  );
}

// ── MAIN PAGE ─────────────────────────────────────────────────────────────────
export default function BestSellerPage() {
  const [visibleCount, setVisibleCount] = useState(12);
  const [sortBy, setSortBy] = useState("default");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    categories: [],
    priceRange: null,
    minRating: null,
    minDiscount: null,
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setVisibleCount(12);
  };

  const handleClear = () => {
    setFilters({ categories: [], priceRange: null, minRating: null, minDiscount: null });
    setVisibleCount(12);
  };

  const filtered = useMemo(() => {
    let list = [...products];
    if (filters.categories.length) list = list.filter(p => filters.categories.includes(p.category));
    if (filters.priceRange !== null) {
      const { min, max } = PRICE_RANGES[filters.priceRange];
      list = list.filter(p => p.price >= min && p.price < max);
    }
    if (filters.minRating !== null) list = list.filter(p => p.rating >= filters.minRating);
    if (filters.minDiscount !== null) list = list.filter(p => p.discount >= filters.minDiscount);
    if (sortBy === "price_asc") list.sort((a, b) => a.price - b.price);
    if (sortBy === "price_desc") list.sort((a, b) => b.price - a.price);
    if (sortBy === "rating") list.sort((a, b) => b.rating - a.rating);
    if (sortBy === "popular") list.sort((a, b) => b.reviews - a.reviews);
    return list;
  }, [filters, sortBy]);

  const visible = filtered.slice(0, visibleCount);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#fafaf8", fontFamily: "'Segoe UI', sans-serif" }}>

      {/* ── Simple Hero Banner ── */}
      <div
        className="relative w-full overflow-hidden"
        style={{ height: "clamp(200px, 30vw, 380px)" }}
      >
        {/* Background jewellery photo — fills the full banner */}
        <img
          src="https://images.pexels.com/photos/1616096/pexels-photo-1616096.jpeg?auto=compress&cs=tinysrgb&w=1400"
          alt="Best Sellers banner"
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover", objectPosition: "center 30%",
          }}
        />

        {/* Subtle right-side fade so text reads cleanly */}
        <div
          style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to left, rgba(250,246,240,0.82) 30%, rgba(250,246,240,0.18) 70%, transparent 100%)",
          }}
        />

        {/* Text — right-aligned, just like the reference */}
        <div
          className="absolute inset-0 flex flex-col items-end justify-center pr-8 sm:pr-14 md:pr-20 lg:pr-28"
          style={{ pointerEvents: "none" }}
        >
          <h1
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "clamp(28px, 5vw, 64px)",
              fontWeight: 300,
              color: "#1a0a05",
              letterSpacing: "0.01em",
              lineHeight: 1.1,
              textAlign: "right",
            }}
          >
            Best Sellers
          </h1>
          <p
            style={{
              marginTop: "clamp(6px, 1vw, 12px)",
              fontSize: "clamp(11px, 1.2vw, 15px)",
              color: "#6b5040",
              fontWeight: 300,
              letterSpacing: "0.04em",
              textAlign: "right",
            }}
          >
            Our most wanted pieces
          </p>
        </div>
      </div>

      {/* ── Breadcrumb ── */}
      <div className="w-full px-4 sm:px-6 py-3" style={{ backgroundColor: "#fff", borderBottom: "1px solid #ede8e0" }}>
        <p className="text-xs tracking-wide max-w-7xl mx-auto" style={{ color: "#999" }}>
          <span style={{ color: "#3a7bd5", cursor: "pointer" }}>Home</span>
          <span className="mx-1">›</span>
          <span style={{ color: "#777", textTransform: "uppercase", fontSize: "10px", letterSpacing: "0.1em" }}>Best Seller</span>
        </p>
      </div>

      {/* ── Body ── */}
      <div className="max-w-7xl mx-auto px-3 sm:px-5 py-8">

        {/* Mobile filter toggle bar */}
        <div
          className="flex items-center justify-between mb-4 md:hidden py-2.5 px-4 rounded-lg"
          style={{ backgroundColor: "#fff", border: "1px solid #ede8e0" }}
        >
          <button
            onClick={() => setMobileFilterOpen(o => !o)}
            className="flex items-center gap-2 text-sm font-semibold focus:outline-none"
            style={{ color: "#1a0a05", background: "none", border: "none", cursor: "pointer" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#8b1a1a" style={{ width: 18, height: 18 }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h5.25" />
            </svg>
            Filters {(filters.categories.length + (filters.priceRange !== null ? 1 : 0) + (filters.minRating !== null ? 1 : 0) + (filters.minDiscount !== null ? 1 : 0)) > 0 && (
              <span className="px-1.5 py-0.5 rounded-full text-xs text-white" style={{ backgroundColor: "#8b1a1a" }}>
                {filters.categories.length + (filters.priceRange !== null ? 1 : 0) + (filters.minRating !== null ? 1 : 0) + (filters.minDiscount !== null ? 1 : 0)}
              </span>
            )}
          </button>
          <select
            value={sortBy}
            onChange={e => { setSortBy(e.target.value); setVisibleCount(12); }}
            className="text-xs focus:outline-none"
            style={{ border: "1px solid #d0c4b4", borderRadius: 6, padding: "5px 8px", color: "#1a0a05", backgroundColor: "#fff", cursor: "pointer" }}
          >
            {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>

        {/* Mobile filter drawer */}
        {mobileFilterOpen && (
          <div className="md:hidden mb-5 p-4 rounded-xl" style={{ backgroundColor: "#fff", border: "1px solid #ede8e0" }}>
            <Sidebar filters={filters} onChange={handleFilterChange} onClear={handleClear} totalResults={filtered.length} />
          </div>
        )}

        <div className="flex gap-6 items-start">

          {/* ── Desktop Sidebar ── */}
          <div className="hidden md:block flex-shrink-0" style={{ width: 230 }}>
            <Sidebar filters={filters} onChange={handleFilterChange} onClear={handleClear} totalResults={filtered.length} />
          </div>

          {/* ── Products Area ── */}
          <div className="flex-1 min-w-0">

            {/* Sort + result count bar */}
            <div
              className="hidden md:flex items-center justify-between mb-5 px-4 py-2.5 rounded-lg"
              style={{ backgroundColor: "#fff", border: "1px solid #ede8e0" }}
            >
              <p className="text-sm" style={{ color: "#6b5040" }}>
                Showing <strong>{visible.length}</strong> of <strong>{filtered.length}</strong> products
              </p>
              <div className="flex items-center gap-2">
                <span className="text-sm" style={{ color: "#9a8070" }}>Sort by:</span>
                <select
                  value={sortBy}
                  onChange={e => { setSortBy(e.target.value); setVisibleCount(12); }}
                  className="text-sm focus:outline-none"
                  style={{ border: "1px solid #d0c4b4", borderRadius: 6, padding: "5px 10px", color: "#1a0a05", backgroundColor: "#fff", cursor: "pointer" }}
                >
                  {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
            </div>

            {/* Active filter chips */}
            <ActiveChips filters={filters} onChange={handleFilterChange} />

            {/* Grid */}
            {visible.length > 0 ? (
              <Link to="/productdetails" onClick={()=>scrollTo(0,0)}>
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                  {visible.map(p => <ProductCard key={p.id} product={p} />)}
                </div>
              </Link>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 gap-4" style={{ color: "#b0a090" }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-base font-medium" style={{ color: "#4a3728" }}>No products match your filters</p>
                <button
                  onClick={handleClear}
                  className="px-6 py-2 text-sm font-semibold rounded-full focus:outline-none transition-colors"
                  style={{ backgroundColor: "#8b1a1a", color: "#fff", border: "none", cursor: "pointer" }}
                >
                  Clear All Filters
                </button>
              </div>
            )}

            {/* Load More */}
            {visibleCount < filtered.length && (
              <div className="flex justify-center mt-10">
                <button
                  onClick={() => setVisibleCount(v => Math.min(v + 8, filtered.length))}
                  className="px-10 py-3 text-sm font-semibold tracking-widest uppercase transition-all duration-200 hover:shadow-md active:scale-95 focus:outline-none"
                  style={{ backgroundColor: "#fff", color: "#1a0a05", border: "1px solid #c8bfb0", borderRadius: "4px", letterSpacing: "0.12em", cursor: "pointer" }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#1a0a05"; e.currentTarget.style.color = "#fff"; }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = "#fff"; e.currentTarget.style.color = "#1a0a05"; }}
                >
                  Load More
                </button>
              </div>
            )}
            {visibleCount >= filtered.length && filtered.length > 0 && (
              <p className="text-center text-xs mt-8" style={{ color: "#aaa", letterSpacing: "0.1em" }}>
                Showing all {filtered.length} products
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}