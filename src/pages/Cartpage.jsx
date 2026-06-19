import { useState } from "react";
import {
    Heart,
    X,
    Minus,
    Plus,
    ShieldCheck,
    RotateCcw,
    Truck,
    BadgeCheck,
    Tag,
    ChevronRight,
    Undo2,
    Sparkles,
    ArrowRight,
    Gem,
} from "lucide-react";
import { Link } from "react-router-dom";

/* ---------------------------------------------------------
   Mock data — replace with your real cart / wishlist state
   once this is wired up to context, Redux, or a backend.
--------------------------------------------------------- */
const CART_SEED = [
    {
        id: "c1",
        name: "Aaranya Diamond Halo Pendant Necklace",
        variant: '18K Yellow Gold · 18" Chain',
        price: 48250,
        mrp: 56800,
        qty: 1,
        maxQty: 3,
        image: "https://images.pexels.com/photos/1302307/pexels-photo-1302307.jpeg?auto=compress&cs=tinysrgb&w=300",
    },
    {
        id: "c2",
        name: "Aaranya Diamond Stud Earrings",
        variant: "18K Yellow Gold",
        price: 22400,
        mrp: 26800,
        qty: 1,
        maxQty: 3,
        image: "https://images.pexels.com/photos/9428819/pexels-photo-9428819.jpeg?auto=compress&cs=tinysrgb&w=300",
    },
    {
        id: "c3",
        name: "Aaranya Tennis Bracelet",
        variant: "Platinum",
        price: 64500,
        mrp: 74900,
        qty: 1,
        maxQty: 2,
        image: "https://images.pexels.com/photos/2735970/pexels-photo-2735970.jpeg?auto=compress&cs=tinysrgb&w=300",
    },
];

const SAVED_SEED = [
    {
        id: "s1",
        name: "Aaranya Halo Ring",
        variant: "18K Rose Gold · Size 14",
        price: 38900,
        mrp: 45500,
        maxQty: 3,
        image: "https://images.pexels.com/photos/691046/pexels-photo-691046.jpeg?auto=compress&cs=tinysrgb&w=300",
    },
];

const RECOMMENDED = [
    { name: "Aaranya Cluster Hoops", price: 18900, image: "https://images.pexels.com/photos/1302307/pexels-photo-1302307.jpeg?auto=compress&cs=tinysrgb&w=300" },
    { name: "Aaranya Solitaire Pendant", price: 31200, image: "https://images.pexels.com/photos/9428819/pexels-photo-9428819.jpeg?auto=compress&cs=tinysrgb&w=300" },
    { name: "Aaranya Charm Bracelet", price: 27600, image: "https://images.pexels.com/photos/2735970/pexels-photo-2735970.jpeg?auto=compress&cs=tinysrgb&w=300" },
    { name: "Aaranya Drop Earrings", price: 24300, image: "https://images.pexels.com/photos/691046/pexels-photo-691046.jpeg?auto=compress&cs=tinysrgb&w=300" },
];

const formatINR = (n) => "₹" + Math.round(n).toLocaleString("en-IN");

/* ---------------------------------------------------------
   Small building blocks
--------------------------------------------------------- */
const ProductImg = ({ src, alt, className }) => {
    const [broken, setBroken] = useState(false);
    if (broken) {
        return (
            <div className={`flex items-center justify-center ${className}`} style={{ background: "linear-gradient(135deg,#2a211a,#4a3826)" }}>
                <Gem className="text-[#D8BD86]" size={20} />
            </div>
        );
    }
    return <img src={src} alt={alt} className={className} onError={() => setBroken(true)} />;
};

const EmptyBoxIllustration = () => (
    <svg viewBox="0 0 160 120" className="w-32 h-24 mx-auto mb-5" fill="none" stroke="#B6883E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M30 70 L130 70 L120 110 L40 110 Z" />
        <path d="M30 70 L20 40 L60 30 L70 50" />
        <path d="M130 70 L140 40 L100 30 L90 50" />
        <path d="M55 85 Q80 75 105 85" strokeDasharray="3 4" />
        <circle cx="80" cy="55" r="3" fill="#B6883E" stroke="none" />
        <path d="M80 45 L80 50 M80 60 L80 65 M70 55 L75 55 M85 55 L90 55" strokeWidth="1.8" />
    </svg>
);

const SectionCard = ({ children, className = "" }) => (
    <div className={`bg-white border border-[#EDE3D2] rounded-2xl p-5 sm:p-6 ${className}`}>{children}</div>
);

/* ---------------------------------------------------------
   Main component
--------------------------------------------------------- */
const CartPage = ({ onCheckout, onContinueShopping }) => {
    const [cartItems, setCartItems] = useState(CART_SEED);
    const [savedItems, setSavedItems] = useState(SAVED_SEED);
    const [toast, setToast] = useState(null);
    const [coupon, setCoupon] = useState("");
    const [discount, setDiscount] = useState(0);
    const [couponMsg, setCouponMsg] = useState(null);

    const subtotal = cartItems.reduce((s, i) => s + i.price * i.qty, 0);
    const mrpTotal = cartItems.reduce((s, i) => s + i.mrp * i.qty, 0);
    const savings = mrpTotal - subtotal;
    const gst = Math.round(subtotal * 0.03);
    const total = subtotal + gst - discount;

    const updateQty = (id, delta) => {
        setCartItems((items) =>
            items.map((it) => (it.id === id ? { ...it, qty: Math.min(it.maxQty, Math.max(1, it.qty + delta)) } : it))
        );
    };

    const removeItem = (id) => {
        setCartItems((items) => {
            const index = items.findIndex((it) => it.id === id);
            const item = items[index];
            setToast({ item, index });
            setTimeout(() => setToast((t) => (t && t.item.id === id ? null : t)), 5000);
            return items.filter((it) => it.id !== id);
        });
    };

    const undoRemove = () => {
        if (!toast) return;
        setCartItems((items) => {
            const next = [...items];
            next.splice(toast.index, 0, toast.item);
            return next;
        });
        setToast(null);
    };

    const saveForLater = (id) => {
        setCartItems((items) => {
            const item = items.find((it) => it.id === id);
            if (item) setSavedItems((s) => [...s, item]);
            return items.filter((it) => it.id !== id);
        });
    };

    const moveToBag = (id) => {
        setSavedItems((items) => {
            const item = items.find((it) => it.id === id);
            if (item) setCartItems((c) => [...c, { ...item, qty: 1 }]);
            return items.filter((it) => it.id !== id);
        });
    };

    const removeSaved = (id) => setSavedItems((items) => items.filter((it) => it.id !== id));

    const clearBag = () => setCartItems([]);

    const applyCoupon = () => {
        const code = coupon.trim().toUpperCase();
        if (code === "RITVAA10" && subtotal > 0) {
            const d = Math.min(Math.round(subtotal * 0.1), 3000);
            setDiscount(d);
            setCouponMsg({ ok: true, text: `Applied — you saved ${formatINR(d)}` });
        } else {
            setDiscount(0);
            setCouponMsg({ ok: false, text: "Invalid or expired coupon code" });
        }
    };

    return (
        <div className="font-ui bg-[#FBF7F0] text-[#231B14] min-h-screen pb-28 lg:pb-16 relative">
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500&family=Inter:wght@400;500;600;700&display=swap');
        .font-display { font-family: 'Playfair Display', Georgia, serif; }
        .font-ui { font-family: 'Inter', system-ui, sans-serif; }
        @keyframes slideUp { 0% { transform: translateY(12px); opacity: 0; } 100% { transform: translateY(0); opacity: 1; } }
        .animate-slide-up { animation: slideUp 0.25s ease-out; }
      `}</style>

            <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-24 lg:pt-28">
                {/* Breadcrumb */}
                <div className="flex items-center gap-1.5 text-xs text-[#8A7E70] mb-4">
                    <span>Home</span>
                    <ChevronRight size={12} />
                    <span className="text-[#231B14]">Shopping Bag</span>
                </div>

                <div className="flex items-center justify-between mb-7 flex-wrap gap-2">
                    <h1 className="font-display text-2xl sm:text-3xl">
                        Your Bag {cartItems.length > 0 && <span className="text-[#8A7E70] text-lg font-normal">({cartItems.length} item{cartItems.length > 1 ? "s" : ""})</span>}
                    </h1>
                    {cartItems.length > 0 && (
                        <button onClick={clearBag} className="text-sm text-[#8A7E70] hover:text-[#9E1B32]">
                            Clear bag
                        </button>
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                    {/* Main column */}
                    <div className="lg:col-span-2 space-y-4">
                        {cartItems.length === 0 ? (
                            <SectionCard className="text-center py-14">
                                <EmptyBoxIllustration />
                                <h2 className="font-display text-xl mb-2">Your bag is empty</h2>
                                <p className="text-sm text-[#8A7E70] max-w-sm mx-auto mb-6">
                                    Looks like you haven't added anything yet. Explore our collections to find your next favourite piece.
                                </p>
                                <button
                                    onClick={onContinueShopping}
                                    className="bg-[#9E1B32] text-white font-medium px-6 py-3 rounded-full hover:bg-[#7E1527] transition"
                                >
                                    Continue Shopping
                                </button>
                            </SectionCard>
                        ) : (
                            cartItems.map((item) => (
                                <div key={item.id} className="relative bg-white border border-[#EDE3D2] rounded-2xl overflow-hidden animate-slide-up">
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#B6883E] to-[#9E1B32]" />
                                    <div className="flex gap-4 p-4 sm:p-5 pl-5 sm:pl-6">
                                        <ProductImg src={item.image} alt={item.name} className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover border border-[#EDE3D2] shrink-0" />
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between gap-2">
                                                <div>
                                                    <p className="text-sm font-medium leading-snug">{item.name}</p>
                                                    <p className="text-xs text-[#8A7E70] mt-0.5">{item.variant}</p>
                                                </div>
                                                <button onClick={() => removeItem(item.id)} className="text-[#8A7E70] hover:text-[#9E1B32] shrink-0" aria-label="Remove item">
                                                    <X size={16} />
                                                </button>
                                            </div>

                                            <div className="flex items-end justify-between mt-3 flex-wrap gap-3">
                                                <div className="flex items-center border border-[#EDE3D2] rounded-full">
                                                    <button onClick={() => updateQty(item.id, -1)} className="w-8 h-8 flex items-center justify-center text-[#5C5247] hover:text-[#9E1B32]" aria-label="Decrease quantity">
                                                        <Minus size={13} />
                                                    </button>
                                                    <span className="w-7 text-center text-sm font-medium">{item.qty}</span>
                                                    <button onClick={() => updateQty(item.id, 1)} className="w-8 h-8 flex items-center justify-center text-[#5C5247] hover:text-[#9E1B32]" aria-label="Increase quantity">
                                                        <Plus size={13} />
                                                    </button>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-display text-lg">{formatINR(item.price * item.qty)}</p>
                                                    {item.mrp > item.price && <p className="text-xs text-[#A89C89] line-through">{formatINR(item.mrp * item.qty)}</p>}
                                                </div>
                                            </div>

                                            <button onClick={() => saveForLater(item.id)} className="flex items-center gap-1.5 text-xs text-[#8A7E70] hover:text-[#9E1B32] mt-3">
                                                <Heart size={12} /> Save for later
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}

                        {/* Saved for later */}
                        {savedItems.length > 0 && (
                            <div className="pt-4">
                                <h2 className="font-display text-lg mb-3">Saved for Later ({savedItems.length})</h2>
                                <div className="space-y-3">
                                    {savedItems.map((item) => (
                                        <div key={item.id} className="flex gap-4 p-4 bg-white border border-[#EDE3D2] rounded-2xl">
                                            <ProductImg src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover border border-[#EDE3D2] shrink-0" />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium leading-snug">{item.name}</p>
                                                <p className="text-xs text-[#8A7E70] mt-0.5">{item.variant}</p>
                                                <p className="font-display text-base mt-1">{formatINR(item.price)}</p>
                                                <div className="flex gap-4 mt-2">
                                                    <button onClick={() => moveToBag(item.id)} className="text-xs font-medium text-[#9E1B32] hover:underline">
                                                        Move to Bag
                                                    </button>
                                                    <button onClick={() => removeSaved(item.id)} className="text-xs text-[#8A7E70] hover:text-[#231B14]">
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar — summary */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24">
                            {cartItems.length === 0 ? (
                                <SectionCard>
                                    <p className="text-sm text-[#8A7E70]">Your order summary will appear here once you add an item to your bag.</p>
                                </SectionCard>
                            ) : (
                                <SectionCard>
                                    <h2 className="font-display text-lg mb-4">Order Summary</h2>

                                    {savings > 0 && (
                                        <div className="flex items-center gap-2 text-sm text-[#2E7D4F] bg-[#2E7D4F]/10 rounded-lg px-3 py-2 mb-4">
                                            <Sparkles size={14} /> You're saving {formatINR(savings)} on this order
                                        </div>
                                    )}

                                    <div className="flex gap-2 mb-4">
                                        <div className="flex-1 relative">
                                            <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8A7E70]" />
                                            <input
                                                placeholder="Coupon code"
                                                value={coupon}
                                                onChange={(e) => setCoupon(e.target.value)}
                                                className="w-full border border-[#EDE3D2] rounded-lg pl-8 pr-3 py-2 text-sm focus:outline-none focus:border-[#9E1B32]"
                                            />
                                        </div>
                                        <button onClick={applyCoupon} className="px-4 py-2 rounded-lg border border-[#231B14] text-sm font-medium hover:bg-[#231B14] hover:text-white transition">
                                            Apply
                                        </button>
                                    </div>
                                    {couponMsg && <p className={`text-xs mb-4 ${couponMsg.ok ? "text-[#2E7D4F]" : "text-[#9E1B32]"}`}>{couponMsg.text}</p>}

                                    <div className="space-y-2 text-sm text-[#5C5247]">
                                        <div className="flex justify-between">
                                            <span>Item total</span>
                                            <span>{formatINR(subtotal)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>GST (3%)</span>
                                            <span>{formatINR(gst)}</span>
                                        </div>
                                        {discount > 0 && (
                                            <div className="flex justify-between text-[#2E7D4F]">
                                                <span>Coupon discount</span>
                                                <span>-{formatINR(discount)}</span>
                                            </div>
                                        )}
                                        <div className="flex justify-between">
                                            <span>Shipping</span>
                                            <span className="text-[#2E7D4F] font-medium">Free</span>
                                        </div>
                                    </div>

                                    <div className="h-px bg-[#EDE3D2] my-3" />
                                    <div className="flex justify-between text-base font-semibold mb-5">
                                        <span>Total</span>
                                        <span>{formatINR(total)}</span>
                                    </div>

                                    <Link to="/buynow"> <button
                                        onClick={onCheckout}
                                        className="w-full cursor-pointer bg-[#9E1B32] text-white font-medium py-3.5 rounded-full hover:bg-[#7E1527] transition flex items-center justify-center gap-2"
                                    >
                                        Proceed to Checkout <ArrowRight size={16} />
                                    </button></Link>

                                    <div className="grid grid-cols-2 gap-3 mt-5 pt-5 border-t border-[#EDE3D2]">
                                        {[
                                            { icon: ShieldCheck, label: "BIS Hallmark Certified" },
                                            { icon: RotateCcw, label: "15-Day Easy Returns" },
                                            { icon: Truck, label: "Free Insured Shipping" },
                                            { icon: BadgeCheck, label: "Lifetime Exchange" },
                                        ].map(({ icon: Icon, label }) => (
                                            <div key={label} className="flex items-center gap-2 text-xs text-[#5C5247]">
                                                <Icon size={15} className="text-[#9E1B32] shrink-0" />
                                                {label}
                                            </div>
                                        ))}
                                    </div>
                                </SectionCard>
                            )}
                        </div>
                    </div>
                </div>

                {/* Recommendations */}
                <div className="mt-14">
                    <h2 className="font-display text-2xl mb-6">You Might Also Like</h2>
                    <div className="flex gap-5 overflow-x-auto pb-2">
                        {RECOMMENDED.map((p, i) => (
                            <div key={i} className="shrink-0 w-44 sm:w-52 group cursor-pointer">
                                <div className="w-44 h-44 sm:w-52 sm:h-52 rounded-2xl overflow-hidden bg-white border border-[#EDE3D2] mb-3">
                                    <ProductImg src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                                </div>
                                <p className="text-sm font-medium text-[#231B14] leading-snug">{p.name}</p>
                                <p className="text-sm text-[#9E1B32] font-semibold mt-1">{formatINR(p.price)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Undo toast */}
            {toast && (
                <div className="fixed bottom-24 lg:bottom-6 left-1/2 -translate-x-1/2 bg-[#231B14] text-white text-sm px-4 py-3 rounded-full flex items-center gap-3 shadow-lg z-50 animate-slide-up">
                    <span>Item removed</span>
                    <button onClick={undoRemove} className="flex items-center gap-1 font-medium text-[#D8BD86] hover:text-white">
                        <Undo2 size={14} /> Undo
                    </button>
                </div>
            )}

            {/* Mobile sticky bar */}
            {cartItems.length > 0 && (
                <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#EDE3D2] p-4 flex items-center gap-3 z-40">
                    <div className="flex-1">
                        <p className="text-[10px] text-[#8A7E70] uppercase tracking-wide">Total</p>
                        <p className="font-display text-lg leading-none">{formatINR(total)}</p>
                    </div>
                    <Link to="/buynow"><button onClick={onCheckout} className="px-6 py-3 rounded-full font-medium text-sm bg-[#9E1B32] text-white flex items-center gap-1.5">
                        Checkout <ArrowRight size={14} />
                    </button></Link>
                </div>
            )}
        </div>
    );
};

export default CartPage;