import { useState } from "react";
import {
    Star,
    Heart,
    Share2,
    Minus,
    Plus,
    ShieldCheck,
    Truck,
    RotateCcw,
    BadgeCheck,
    MapPin,
    Gem,
    Check,
    ThumbsUp,
    ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";

/* ---------------------------------------------------------
   Mock product data — swap this with your real catalogue
   data / API response. Shape is intentionally flat so it's
   easy to wire up to a backend later.
--------------------------------------------------------- */
const PRODUCT = {
    brand: "RITVAA Fine Jewellery",
    name: "Aaranya Diamond Halo Pendant Necklace",
    rating: 4.7,
    ratingCount: 482,
    basePrice: 48250,
    images: [
        "https://images.pexels.com/photos/1302307/pexels-photo-1302307.jpeg?auto=compress&cs=tinysrgb&w=900",
        "https://images.pexels.com/photos/9428819/pexels-photo-9428819.jpeg?auto=compress&cs=tinysrgb&w=900",
        "https://images.pexels.com/photos/2735970/pexels-photo-2735970.jpeg?auto=compress&cs=tinysrgb&w=900",
        "https://images.pexels.com/photos/691046/pexels-photo-691046.jpeg?auto=compress&cs=tinysrgb&w=900",
    ],
    metals: [
        { id: "14ky", label: "14K Yellow Gold", delta: -3200 },
        { id: "18ky", label: "18K Yellow Gold", delta: 0 },
        { id: "18rg", label: "18K Rose Gold", delta: 650 },
        { id: "plat", label: "Platinum", delta: 9100 },
    ],
    chainLengths: ['16"', '18"', '20" (Adjustable)'],
    specs: [
        ["Metal", "Gold"],
        ["Purity", "18 KT (750)"],
        ["Gross Weight", "4.82 g"],
        ["Gemstone", "Lab-grown Diamond, Halo Cluster"],
        ["Diamond Weight", "0.42 ct · VS1 Clarity · F–G Colour"],
        ["Chain", "Cable chain, adjustable length"],
        ["Certification", "BIS Hallmarked · IGI Certified"],
        ["SKU", "RTV-PN-2284"],
    ],
    care: [
        "Keep away from perfume, lotion and hairspray — apply these first, jewellery last.",
        "Store in the velvet pouch provided, away from other pieces to avoid scratching.",
        "Wipe gently with a soft, dry cloth after each wear.",
        "Remove before swimming, exercising or sleeping.",
        "Get a professional polish at any RITVAA store once a year, free for life.",
    ],
};

const RATING_BREAKDOWN = [
    { stars: 5, pct: 78 },
    { stars: 4, pct: 14 },
    { stars: 3, pct: 5 },
    { stars: 2, pct: 2 },
    { stars: 1, pct: 1 },
];

const REVIEWS = [
    {
        name: "Priya N.",
        rating: 5,
        date: "2 weeks ago",
        title: "Worth every rupee",
        body: "The halo setting catches light beautifully and the chain sits perfectly. Packaging felt premium too — came with the hallmark card and a little authentication booklet.",
        helpful: 24,
    },
    {
        name: "Kavya R.",
        rating: 4,
        date: "1 month ago",
        title: "Gorgeous, slightly smaller than I imagined",
        body: "Quality is excellent and true to the photos, just expected the pendant to be a touch larger. Wearing it daily a month in, no tarnishing at all.",
        helpful: 9,
    },
    {
        name: "Meera S.",
        rating: 5,
        date: "1 month ago",
        title: "Perfect anniversary gift",
        body: "Ordered this for our anniversary — the size guide on the site was accurate and delivery arrived well ahead of the estimate.",
        helpful: 15,
    },
];

const RELATED = [
    { name: "Aaranya Diamond Stud Earrings", price: 22400, image: PRODUCT.images[1] },
    { name: "Aaranya Tennis Bracelet", price: 64500, image: PRODUCT.images[2] },
    { name: "Aaranya Halo Ring", price: 38900, image: PRODUCT.images[3] },
    { name: "Aaranya Layered Chain", price: 19800, image: PRODUCT.images[0] },
];

const formatINR = (n) => "₹" + Math.round(n).toLocaleString("en-IN");

/* ---------------------------------------------------------
   Small building blocks
--------------------------------------------------------- */
const ProductImg = ({ src, alt, className, style }) => {
    const [broken, setBroken] = useState(false);
    if (broken) {
        return (
            <div
                className={`flex items-center justify-center ${className}`}
                style={{ background: "linear-gradient(135deg,#2a211a,#4a3826)", ...style }}
            >
                <Gem className="text-[#D8BD86]" size={28} />
            </div>
        );
    }
    return (
        <img src={src} alt={alt} className={className} style={style} onError={() => setBroken(true)} />
    );
};

const StarRow = ({ rating, size = 14 }) => (
    <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
            <Star
                key={i}
                size={size}
                className={i <= Math.round(rating) ? "fill-[#B6883E] text-[#B6883E]" : "fill-transparent text-[#D8CBB0]"}
            />
        ))}
    </div>
);

/* ---------------------------------------------------------
   Main component
--------------------------------------------------------- */
const ProductDetailsPage = () => {
    const [activeImg, setActiveImg] = useState(0);
    const [metal, setMetal] = useState(PRODUCT.metals[1].id);
    const [length, setLength] = useState(PRODUCT.chainLengths[1]);
    const [qty, setQty] = useState(1);
    const [wishlisted, setWishlisted] = useState(false);
    const [shared, setShared] = useState(false);
    const [added, setAdded] = useState(false);
    const [tab, setTab] = useState("details");
    const [pincode, setPincode] = useState("");
    const [delivery, setDelivery] = useState(null);
    const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
    const [zooming, setZooming] = useState(false);

    const selectedMetal = PRODUCT.metals.find((m) => m.id === metal);
    const price = PRODUCT.basePrice + selectedMetal.delta;
    const mrp = Math.round(price / 0.85);
    const discount = Math.round((1 - price / mrp) * 100);
    const emi = Math.round(price / 12);

    const handleAdd = () => {
        setAdded(true);
        setTimeout(() => setAdded(false), 2200);
    };

    const handleShare = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
        } catch (e) {
            /* clipboard unavailable in this context — UI still confirms */
        }
        setShared(true);
        setTimeout(() => setShared(false), 1800);
    };

    const checkDelivery = () => {
        if (!/^\d{6}$/.test(pincode)) {
            setDelivery({ ok: false, msg: "Enter a valid 6-digit pincode" });
            return;
        }
        setDelivery({ ok: true, msg: "Delivery by Fri, 26 Jun · Free insured shipping" });
    };

    return (
        <div className="font-ui bg-[#FBF7F0] text-[#231B14] min-h-screen pb-20">
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500&family=Inter:wght@400;500;600;700&display=swap');
        .font-display { font-family: 'Playfair Display', Georgia, serif; }
        .font-ui { font-family: 'Inter', system-ui, sans-serif; }
      `}</style>

            <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-28">
                {/* Breadcrumb */}
                <div className="flex items-center gap-1.5 text-xs text-[#8A7E70] mb-6 flex-wrap">
                    <span>Home</span>
                    <ChevronRight size={12} />
                    <span>Necklaces</span>
                    <ChevronRight size={12} />
                    <span>Diamond Necklace</span>
                    <ChevronRight size={12} />
                    <span className="text-[#231B14]">{PRODUCT.name}</span>
                </div>

                {/* Main grid */}
                <div className="grid grid-cols-1 lg:grid-cols-[88px_1fr_1fr] gap-6 lg:gap-10">
                    {/* Thumbnails (desktop) */}
                    <div className="hidden lg:flex flex-col gap-3 order-1">
                        {PRODUCT.images.map((src, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveImg(i)}
                                className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition ${activeImg === i ? "border-[#9E1B32]" : "border-transparent hover:border-[#D8CBB0]"
                                    }`}
                            >
                                <ProductImg src={src} alt={`${PRODUCT.name} view ${i + 1}`} className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>

                    {/* Main image with hover zoom */}
                    <div className="order-2 lg:order-2">
                        <div
                            className="relative w-full aspect-square rounded-2xl overflow-hidden bg-white border border-[#EDE3D2] cursor-zoom-in"
                            onMouseMove={(e) => {
                                const rect = e.currentTarget.getBoundingClientRect();
                                setZoomPos({
                                    x: ((e.clientX - rect.left) / rect.width) * 100,
                                    y: ((e.clientY - rect.top) / rect.height) * 100,
                                });
                            }}
                            onMouseEnter={() => setZooming(true)}
                            onMouseLeave={() => setZooming(false)}
                        >
                            <ProductImg
                                src={PRODUCT.images[activeImg]}
                                alt={PRODUCT.name}
                                className="w-full h-full object-cover transition-transform duration-200"
                                style={zooming ? { transform: "scale(1.8)", transformOrigin: `${zoomPos.x}% ${zoomPos.y}%` } : {}}
                            />

                            <div className="absolute top-4 left-4 bg-[#9E1B32] text-white text-[10px] font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full">
                                Bestseller
                            </div>

                            <div className="absolute top-4 right-4 flex flex-col gap-2">
                                <button
                                    onClick={() => setWishlisted((w) => !w)}
                                    className="w-9 h-9 rounded-full bg-white/90 flex items-center justify-center shadow-sm hover:bg-white"
                                    aria-label="Add to wishlist"
                                >
                                    <Heart size={16} className={wishlisted ? "fill-[#9E1B32] text-[#9E1B32]" : "text-[#231B14]"} />
                                </button>
                                <button
                                    onClick={handleShare}
                                    className="w-9 h-9 rounded-full bg-white/90 flex items-center justify-center shadow-sm hover:bg-white"
                                    aria-label="Share this product"
                                >
                                    <Share2 size={16} className="text-[#231B14]" />
                                </button>
                                {shared && (
                                    <span className="absolute right-11 top-11 bg-[#231B14] text-white text-[11px] px-2.5 py-1 rounded-md whitespace-nowrap">
                                        Link copied
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Thumbnails (mobile) */}
                        <div className="flex lg:hidden gap-2 mt-3 overflow-x-auto pb-1">
                            {PRODUCT.images.map((src, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveImg(i)}
                                    className={`shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 ${activeImg === i ? "border-[#9E1B32]" : "border-transparent"
                                        }`}
                                >
                                    <ProductImg src={src} alt="" className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Buy box */}
                    <div className="order-3 lg:order-3">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#B6883E] mb-2">
                            {PRODUCT.brand}
                        </p>
                        <h1 className="font-display text-2xl lg:text-[28px] leading-tight text-[#231B14] mb-3">
                            {PRODUCT.name}
                        </h1>

                        <div className="flex items-center gap-2 mb-5">
                            <StarRow rating={PRODUCT.rating} />
                            <span className="text-sm font-semibold">{PRODUCT.rating}</span>
                            <button onClick={() => setTab("reviews")} className="text-sm text-[#8A7E70] underline hover:text-[#9E1B32]">
                                {PRODUCT.ratingCount} ratings
                            </button>
                        </div>

                        {/* Price */}
                        <div className="flex items-end gap-3 mb-1 flex-wrap">
                            <span className="font-display text-3xl text-[#231B14]">{formatINR(price)}</span>
                            <span className="text-base text-[#A89C89] line-through mb-1">{formatINR(mrp)}</span>
                            <span className="text-sm font-semibold text-[#9E1B32] mb-1">{discount}% off</span>
                        </div>
                        <p className="text-sm text-[#8A7E70] mb-5">
                            or No-Cost EMI from <span className="font-medium text-[#231B14]">{formatINR(emi)}/month</span>
                        </p>

                        <div className="h-px bg-[#EDE3D2] mb-5" />

                        {/* Metal */}
                        <div className="mb-5">
                            <p className="text-xs font-semibold uppercase tracking-wide text-[#8A7E70] mb-2">
                                Metal — {selectedMetal.label}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {PRODUCT.metals.map((m) => (
                                    <button
                                        key={m.id}
                                        onClick={() => setMetal(m.id)}
                                        className={`px-3.5 py-2 rounded-full text-sm border transition ${metal === m.id
                                            ? "border-[#9E1B32] bg-[#9E1B32]/5 text-[#9E1B32] font-medium"
                                            : "border-[#EDE3D2] text-[#5C5247] hover:border-[#D8CBB0]"
                                            }`}
                                    >
                                        {m.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Chain length */}
                        <div className="mb-6">
                            <p className="text-xs font-semibold uppercase tracking-wide text-[#8A7E70] mb-2">
                                Chain length — {length}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {PRODUCT.chainLengths.map((l) => (
                                    <button
                                        key={l}
                                        onClick={() => setLength(l)}
                                        className={`px-3.5 py-2 rounded-full text-sm border transition ${length === l
                                            ? "border-[#9E1B32] bg-[#9E1B32]/5 text-[#9E1B32] font-medium"
                                            : "border-[#EDE3D2] text-[#5C5247] hover:border-[#D8CBB0]"
                                            }`}
                                    >
                                        {l}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <p className="text-sm text-[#2E7D4F] font-medium mb-5 flex items-center gap-1.5">
                            <Check size={15} /> In stock — ships in 2 business days
                        </p>

                        {/* Qty + CTAs */}
                        <div className="flex items-center gap-3 mb-3">
                            <div className="flex items-center border border-[#EDE3D2] rounded-full">
                                <button
                                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                                    className="w-9 h-9 flex items-center justify-center text-[#5C5247] hover:text-[#9E1B32]"
                                    aria-label="Decrease quantity"
                                >
                                    <Minus size={14} />
                                </button>
                                <span className="w-8 text-center text-sm font-medium">{qty}</span>
                                <button
                                    onClick={() => setQty((q) => Math.min(3, q + 1))}
                                    className="w-9 h-9 flex items-center justify-center text-[#5C5247] hover:text-[#9E1B32]"
                                    aria-label="Increase quantity"
                                >
                                    <Plus size={14} />
                                </button>
                            </div>
                            {added && (
                                <span className="text-sm text-[#2E7D4F] font-medium flex items-center gap-1">
                                    <Check size={14} /> Added to bag
                                </span>
                            )}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 mb-6">
                            <button
                                onClick={handleAdd}
                                className="flex-1 border-2 border-[#231B14] text-[#231B14] font-medium py-3 rounded-full hover:bg-[#231B14] hover:text-white transition"
                            >
                                Add to Bag
                            </button>
                            <Link to="/buynow" className="flex-1">
                                <button className="w-full cursor-pointer bg-[#9E1B32] text-white font-medium py-3 rounded-full hover:bg-[#7E1527] transition">
                                    Buy Now
                                </button>
                            </Link>
                        </div>

                        {/* Pincode check */}
                        <div className="mb-6">
                            <div className="flex items-center gap-2 mb-2">
                                <MapPin size={15} className="text-[#8A7E70]" />
                                <span className="text-sm font-medium">Check delivery date</span>
                            </div>
                            <div className="flex gap-2">
                                <input
                                    value={pincode}
                                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                                    placeholder="Enter pincode"
                                    className="flex-1 border border-[#EDE3D2] rounded-full px-4 py-2 text-sm focus:outline-none focus:border-[#9E1B32]"
                                />
                                <button
                                    onClick={checkDelivery}
                                    className="px-5 py-2 rounded-full border border-[#231B14] text-sm font-medium hover:bg-[#231B14] hover:text-white transition"
                                >
                                    Check
                                </button>
                            </div>
                            {delivery && (
                                <p className={`text-xs mt-2 ${delivery.ok ? "text-[#2E7D4F]" : "text-[#9E1B32]"}`}>{delivery.msg}</p>
                            )}
                        </div>

                        {/* Hallmark seal */}
                        <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-[#EDE3D2] mb-4">
                            <div className="shrink-0 w-16 h-16 rounded-full border-2 border-dashed border-[#B6883E] flex flex-col items-center justify-center text-center leading-none">
                                <span className="text-[8px] font-semibold tracking-wide text-[#B6883E]">BIS</span>
                                <Gem size={14} className="text-[#B6883E] my-0.5" />
                                <span className="text-[7px] font-semibold tracking-wide text-[#B6883E]">HALLMARK</span>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-[#231B14]">Certified Authenticity</p>
                                <p className="text-xs text-[#8A7E70] mt-0.5">
                                    Every piece ships with a BIS hallmark stamp and an IGI certificate for the diamond.
                                </p>
                            </div>
                        </div>

                        {/* Trust badges */}
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { icon: ShieldCheck, label: "BIS Hallmark Certified" },
                                { icon: RotateCcw, label: "15-Day Easy Returns" },
                                { icon: Truck, label: "Free Insured Shipping" },
                                { icon: BadgeCheck, label: "Lifetime Exchange" },
                            ].map(({ icon: Icon, label }) => (
                                <div key={label} className="flex items-center gap-2 text-xs text-[#5C5247]">
                                    <Icon size={16} className="text-[#9E1B32] shrink-0" />
                                    {label}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="mt-16">
                    <div className="flex gap-8 border-b border-[#EDE3D2]">
                        {[
                            { id: "details", label: "Details" },
                            { id: "care", label: "Care Guide" },
                            { id: "reviews", label: "Reviews" },
                        ].map((t) => (
                            <button
                                key={t.id}
                                onClick={() => setTab(t.id)}
                                className={`pb-3 text-sm font-medium relative ${tab === t.id ? "text-[#231B14]" : "text-[#8A7E70]"}`}
                            >
                                {t.label}
                                {tab === t.id && <span className="absolute left-0 right-0 -bottom-px h-[2px] bg-[#9E1B32]" />}
                            </button>
                        ))}
                    </div>

                    <div className="py-8 max-w-3xl">
                        {tab === "details" && (
                            <div className="divide-y divide-[#EDE3D2]">
                                {PRODUCT.specs.map(([k, v]) => (
                                    <div key={k} className="flex py-3 text-sm">
                                        <span className="w-44 shrink-0 text-[#8A7E70]">{k}</span>
                                        <span className="text-[#231B14] font-medium">{v}</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        {tab === "care" && (
                            <ul className="space-y-3">
                                {PRODUCT.care.map((line, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-[#5C5247]">
                                        <Gem size={14} className="text-[#B6883E] mt-0.5 shrink-0" />
                                        {line}
                                    </li>
                                ))}
                            </ul>
                        )}

                        {tab === "reviews" && (
                            <div>
                                <div className="flex flex-col sm:flex-row gap-10 mb-8">
                                    <div className="text-center sm:text-left">
                                        <p className="font-display text-4xl">{PRODUCT.rating}</p>
                                        <StarRow rating={PRODUCT.rating} size={16} />
                                        <p className="text-xs text-[#8A7E70] mt-1">{PRODUCT.ratingCount} ratings</p>
                                    </div>
                                    <div className="flex-1 space-y-1.5">
                                        {RATING_BREAKDOWN.map((r) => (
                                            <div key={r.stars} className="flex items-center gap-2 text-xs">
                                                <span className="w-10 text-[#8A7E70]">{r.stars} star</span>
                                                <div className="flex-1 h-1.5 rounded-full bg-[#EDE3D2] overflow-hidden">
                                                    <div className="h-full bg-[#B6883E]" style={{ width: `${r.pct}%` }} />
                                                </div>
                                                <span className="w-8 text-[#8A7E70] text-right">{r.pct}%</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    {REVIEWS.map((r, i) => (
                                        <div key={i} className="pb-6 border-b border-[#EDE3D2] last:border-0">
                                            <div className="flex items-center gap-3 mb-1.5">
                                                <div className="w-8 h-8 rounded-full bg-[#231B14] text-white text-xs font-medium flex items-center justify-center">
                                                    {r.name[0]}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium">{r.name}</p>
                                                    <p className="text-xs text-[#8A7E70]">{r.date} · Verified Purchase</p>
                                                </div>
                                            </div>
                                            <StarRow rating={r.rating} size={13} />
                                            <p className="text-sm font-medium mt-2">{r.title}</p>
                                            <p className="text-sm text-[#5C5247] mt-1 leading-relaxed">{r.body}</p>
                                            <button className="flex items-center gap-1.5 text-xs text-[#8A7E70] mt-3 hover:text-[#9E1B32]">
                                                <ThumbsUp size={12} /> Helpful ({r.helpful})
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Related products */}
                <div className="mt-12">
                    <h2 className="font-display text-2xl mb-6">Complete the Look</h2>
                    <div className="flex gap-5 overflow-x-auto pb-2">
                        {RELATED.map((p, i) => (
                            <div key={i} className="shrink-0 w-52 group cursor-pointer">
                                <div className="w-52 h-52 rounded-2xl overflow-hidden bg-white border border-[#EDE3D2] mb-3">
                                    <ProductImg
                                        src={p.image}
                                        alt={p.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                                    />
                                </div>
                                <p className="text-sm font-medium text-[#231B14] leading-snug">{p.name}</p>
                                <p className="text-sm text-[#9E1B32] font-semibold mt-1">{formatINR(p.price)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsPage;