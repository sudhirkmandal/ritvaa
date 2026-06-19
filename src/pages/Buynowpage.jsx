import { Fragment, useState } from "react";
import {
  Smartphone,
  CreditCard,
  Landmark,
  Wallet,
  Check,
  Gift,
  ShieldCheck,
  Lock,
  Plus,
  MapPin,
  Gem,
  X,
  Tag,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";

/* ---------------------------------------------------------
   Mock data — replace with your real cart / address-book /
   order data once this is wired up to state or a backend.
--------------------------------------------------------- */
const ORDER_ITEM = {
  name: "Aaranya Diamond Halo Pendant Necklace",
  variant: '18K Yellow Gold · 18" Chain',
  image: "https://images.pexels.com/photos/1302307/pexels-photo-1302307.jpeg?auto=compress&cs=tinysrgb&w=300",
  price: 48250,
  qty: 1,
};

const SAVED_ADDRESSES = [
  {
    id: "a1",
    name: "Aisha Khan",
    phone: "+91 98765 43210",
    line: "402, Sea Breeze Apartments, Carter Road",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400050",
    type: "Home",
  },
  {
    id: "a2",
    name: "Aisha Khan",
    phone: "+91 98765 43210",
    line: "Level 3, Spaces Co-work, BKC",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400051",
    type: "Work",
  },
];

const PAYMENT_METHODS = [
  { id: "upi", label: "UPI", icon: Smartphone, note: "Google Pay, PhonePe, Paytm & more" },
  { id: "card", label: "Credit / Debit Card", icon: CreditCard, note: "Visa, Mastercard, RuPay, Amex" },
  { id: "netbanking", label: "Net Banking", icon: Landmark, note: "All major Indian banks" },
  { id: "cod", label: "Cash on Delivery", icon: Wallet, note: "Unavailable above ₹10,000", disabled: true },
];

const BANKS = ["HDFC Bank", "ICICI Bank", "State Bank of India", "Axis Bank", "Kotak Mahindra Bank"];

const formatINR = (n) => "₹" + Math.round(n).toLocaleString("en-IN");
const formatCard = (v) => v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
const formatExpiry = (v) => {
  const d = v.replace(/\D/g, "").slice(0, 4);
  return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
};

/* ---------------------------------------------------------
   Small building blocks
--------------------------------------------------------- */
const Toggle = ({ checked, onChange }) => (
  <button
    onClick={onChange}
    className={`w-10 h-6 rounded-full relative transition shrink-0 ${checked ? "bg-[#9E1B32]" : "bg-[#D8CBB0]"}`}
    aria-pressed={checked}
  >
    <span
      className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
        checked ? "translate-x-4" : ""
      }`}
    />
  </button>
);

const SectionCard = ({ children, className = "" }) => (
  <div className={`bg-white border border-[#EDE3D2] rounded-2xl p-5 sm:p-6 ${className}`}>{children}</div>
);

const OrderSummaryBody = ({ subtotal, gst, giftCost, protectCost, discount, total, coupon, setCoupon, applyCoupon, couponMsg }) => (
  <div>
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
      <button
        onClick={applyCoupon}
        className="px-4 py-2 rounded-lg border border-[#231B14] text-sm font-medium hover:bg-[#231B14] hover:text-white transition"
      >
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
      {giftCost > 0 && (
        <div className="flex justify-between">
          <span>Gift packaging</span>
          <span>{formatINR(giftCost)}</span>
        </div>
      )}
      {protectCost > 0 && (
        <div className="flex justify-between">
          <span>Shipment protection</span>
          <span>{formatINR(protectCost)}</span>
        </div>
      )}
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
    <div className="flex justify-between text-base font-semibold">
      <span>Total</span>
      <span>{formatINR(total)}</span>
    </div>
  </div>
);

/* ---------------------------------------------------------
   Main component
--------------------------------------------------------- */
const BuyNowPage = () => {
  const [addresses, setAddresses] = useState(SAVED_ADDRESSES);
  const [selectedAddress, setSelectedAddress] = useState(SAVED_ADDRESSES[0].id);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAddr, setNewAddr] = useState({ name: "", phone: "", pincode: "", line: "", city: "", state: "", type: "Home" });
  const [addrError, setAddrError] = useState("");

  const [paymentMethod, setPaymentMethod] = useState(null);
  const [upiId, setUpiId] = useState("");
  const [upiVerified, setUpiVerified] = useState(false);
  const [card, setCard] = useState({ number: "", name: "", expiry: "", cvv: "" });
  const [bank, setBank] = useState(BANKS[0]);

  const [giftWrap, setGiftWrap] = useState(false);
  const [protectShipment, setProtectShipment] = useState(true);

  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponMsg, setCouponMsg] = useState(null);

  const [summaryOpen, setSummaryOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const addressDone = !!selectedAddress;
  const paymentDone = !!paymentMethod && paymentMethod !== "cod";
  const steps = [true, addressDone, paymentDone];

  const subtotal = ORDER_ITEM.price * ORDER_ITEM.qty;
  const gst = Math.round(subtotal * 0.03);
  const giftCost = giftWrap ? 150 : 0;
  const protectCost = protectShipment ? 299 : 0;
  const total = subtotal + gst + giftCost + protectCost - discount;
  const canPlaceOrder = addressDone && paymentDone;

  const applyCoupon = () => {
    const code = coupon.trim().toUpperCase();
    if (code === "RITVAA10") {
      const d = Math.min(Math.round(subtotal * 0.1), 3000);
      setDiscount(d);
      setCouponMsg({ ok: true, text: `Applied — you saved ${formatINR(d)}` });
    } else {
      setDiscount(0);
      setCouponMsg({ ok: false, text: "Invalid or expired coupon code" });
    }
  };

  const saveNewAddress = () => {
    const { name, phone, pincode, line, city, state } = newAddr;
    if (!name || !phone || pincode.length !== 6 || !line || !city || !state) {
      setAddrError("Please fill in all fields with a valid 6-digit pincode.");
      return;
    }
    const id = "a" + (addresses.length + 1);
    setAddresses((prev) => [...prev, { ...newAddr, id }]);
    setSelectedAddress(id);
    setShowAddForm(false);
    setAddrError("");
    setNewAddr({ name: "", phone: "", pincode: "", line: "", city: "", state: "", type: "Home" });
  };

  const placeOrder = () => {
    if (!canPlaceOrder) return;
    setOrderNumber("RTV" + Date.now().toString().slice(-7));
    setOrderPlaced(true);
  };

  return (
    <div className="font-ui bg-[#FBF7F0] text-[#231B14] min-h-screen pb-28 lg:pb-16 relative">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500&family=Inter:wght@400;500;600;700&display=swap');
        .font-display { font-family: 'Playfair Display', Georgia, serif; }
        .font-ui { font-family: 'Inter', system-ui, sans-serif; }
        @keyframes popIn { 0% { transform: scale(0.6); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
        .animate-pop { animation: popIn 0.35s ease-out; }
      `}</style>

      <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-24 lg:pt-28">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#B6883E] mb-2 text-center">
          Secure Checkout
        </p>
        <h1 className="font-display text-2xl sm:text-3xl text-center mb-8">Complete Your Purchase</h1>

        {/* Chain-link progress stepper */}
        <div className="flex items-center justify-center gap-2.5 sm:gap-4 mb-10">
          {["Bag", "Address", "Payment"].map((label, i) => (
            <Fragment key={label}>
              <div className="flex flex-col items-center gap-1.5">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-colors duration-300 ${
                    steps[i] ? "bg-[#9E1B32] border-[#9E1B32] text-white" : "border-[#D8CBB0] text-[#A89C89]"
                  }`}
                >
                  {steps[i] ? <Check size={16} /> : <Gem size={14} />}
                </div>
                <span className={`text-xs font-medium ${steps[i] ? "text-[#231B14]" : "text-[#A89C89]"}`}>{label}</span>
              </div>
              {i < 2 && (
                <div
                  className={`w-9 sm:w-20 h-[2px] mb-5 rounded transition-colors duration-300 ${
                    steps[i] && steps[i + 1] ? "bg-[#9E1B32]" : "bg-[#EDE3D2]"
                  }`}
                />
              )}
            </Fragment>
          ))}
        </div>

        {/* Mobile order summary accordion */}
        <div className="lg:hidden mb-6">
          <SectionCard className="!p-0 overflow-hidden">
            <button onClick={() => setSummaryOpen((o) => !o)} className="w-full flex items-center justify-between px-5 py-4">
              <span className="text-sm font-medium">View order summary · {formatINR(total)}</span>
              <ChevronDown size={16} className={`transition-transform ${summaryOpen ? "rotate-180" : ""}`} />
            </button>
            {summaryOpen && (
              <div className="px-5 pb-5">
                <OrderSummaryBody
                  subtotal={subtotal}
                  gst={gst}
                  giftCost={giftCost}
                  protectCost={protectCost}
                  discount={discount}
                  total={total}
                  coupon={coupon}
                  setCoupon={setCoupon}
                  applyCoupon={applyCoupon}
                  couponMsg={couponMsg}
                />
              </div>
            )}
          </SectionCard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Address */}
            <SectionCard>
              <div className="flex items-center gap-2 mb-4">
                <MapPin size={16} className="text-[#9E1B32]" />
                <h2 className="font-display text-lg">Delivery Address</h2>
              </div>

              <div className="space-y-3">
                {addresses.map((a) => (
                  <label
                    key={a.id}
                    className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition ${
                      selectedAddress === a.id ? "border-[#9E1B32] bg-[#9E1B32]/5" : "border-[#EDE3D2] hover:border-[#D8CBB0]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="address"
                      className="mt-1 accent-[#9E1B32]"
                      checked={selectedAddress === a.id}
                      onChange={() => setSelectedAddress(a.id)}
                    />
                    <div className="text-sm">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-medium">{a.name}</span>
                        <span className="text-[10px] uppercase font-semibold text-[#B6883E] border border-[#B6883E] rounded-full px-2 py-0.5">
                          {a.type}
                        </span>
                      </div>
                      <p className="text-[#5C5247]">
                        {a.line}, {a.city}, {a.state} – {a.pincode}
                      </p>
                      <p className="text-[#8A7E70] mt-0.5">{a.phone}</p>
                    </div>
                  </label>
                ))}
              </div>

              {!showAddForm ? (
                <button
                  onClick={() => setShowAddForm(true)}
                  className="flex items-center gap-1.5 text-sm font-medium text-[#9E1B32] mt-4 hover:underline"
                >
                  <Plus size={15} /> Add a new address
                </button>
              ) : (
                <div className="mt-5 pt-5 border-t border-[#EDE3D2] space-y-3">
                  <div className="grid sm:grid-cols-2 gap-3">
                    <input
                      placeholder="Full name"
                      value={newAddr.name}
                      onChange={(e) => setNewAddr({ ...newAddr, name: e.target.value })}
                      className="border border-[#EDE3D2] rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#9E1B32]"
                    />
                    <input
                      placeholder="Phone number"
                      value={newAddr.phone}
                      onChange={(e) => setNewAddr({ ...newAddr, phone: e.target.value })}
                      className="border border-[#EDE3D2] rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#9E1B32]"
                    />
                  </div>
                  <input
                    placeholder="Address line (flat, building, street, area)"
                    value={newAddr.line}
                    onChange={(e) => setNewAddr({ ...newAddr, line: e.target.value })}
                    className="w-full border border-[#EDE3D2] rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#9E1B32]"
                  />
                  <div className="grid sm:grid-cols-3 gap-3">
                    <input
                      placeholder="City"
                      value={newAddr.city}
                      onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                      className="border border-[#EDE3D2] rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#9E1B32]"
                    />
                    <input
                      placeholder="State"
                      value={newAddr.state}
                      onChange={(e) => setNewAddr({ ...newAddr, state: e.target.value })}
                      className="border border-[#EDE3D2] rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#9E1B32]"
                    />
                    <input
                      placeholder="Pincode"
                      value={newAddr.pincode}
                      onChange={(e) => setNewAddr({ ...newAddr, pincode: e.target.value.replace(/\D/g, "").slice(0, 6) })}
                      className="border border-[#EDE3D2] rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#9E1B32]"
                    />
                  </div>
                  <div className="flex gap-2">
                    {["Home", "Work"].map((t) => (
                      <button
                        key={t}
                        onClick={() => setNewAddr({ ...newAddr, type: t })}
                        className={`px-4 py-1.5 rounded-full text-xs font-medium border ${
                          newAddr.type === t ? "border-[#9E1B32] text-[#9E1B32] bg-[#9E1B32]/5" : "border-[#EDE3D2] text-[#5C5247]"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                  {addrError && <p className="text-xs text-[#9E1B32]">{addrError}</p>}
                  <div className="flex gap-3 pt-1">
                    <button
                      onClick={saveNewAddress}
                      className="bg-[#9E1B32] text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-[#7E1527] transition"
                    >
                      Save & Use this Address
                    </button>
                    <button
                      onClick={() => {
                        setShowAddForm(false);
                        setAddrError("");
                      }}
                      className="text-sm text-[#8A7E70] hover:text-[#231B14]"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </SectionCard>

            {/* Payment */}
            <SectionCard>
              <div className="flex items-center gap-2 mb-4">
                <Lock size={16} className="text-[#9E1B32]" />
                <h2 className="font-display text-lg">Payment Method</h2>
              </div>

              <div className="space-y-3">
                {PAYMENT_METHODS.map((m) => {
                  const Icon = m.icon;
                  const selected = paymentMethod === m.id;
                  return (
                    <div key={m.id}>
                      <label
                        className={`flex items-center gap-3 p-4 rounded-xl border transition ${
                          m.disabled
                            ? "border-[#EDE3D2] opacity-50 cursor-not-allowed"
                            : selected
                            ? "border-[#9E1B32] bg-[#9E1B32]/5 cursor-pointer"
                            : "border-[#EDE3D2] hover:border-[#D8CBB0] cursor-pointer"
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          disabled={m.disabled}
                          checked={selected}
                          onChange={() => setPaymentMethod(m.id)}
                          className="accent-[#9E1B32]"
                        />
                        <Icon size={18} className="text-[#5C5247] shrink-0" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{m.label}</p>
                          <p className="text-xs text-[#8A7E70]">{m.note}</p>
                        </div>
                      </label>

                      {selected && m.id === "upi" && (
                        <div className="mt-2 ml-0 sm:ml-4 p-4 rounded-xl bg-[#FBF7F0] border border-[#EDE3D2] flex flex-col sm:flex-row gap-2">
                          <input
                            placeholder="yourname@upi"
                            value={upiId}
                            onChange={(e) => {
                              setUpiId(e.target.value);
                              setUpiVerified(false);
                            }}
                            className="flex-1 border border-[#EDE3D2] rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#9E1B32] bg-white"
                          />
                          <button
                            onClick={() => upiId.includes("@") && setUpiVerified(true)}
                            className="px-4 py-2.5 rounded-lg bg-[#231B14] text-white text-sm font-medium whitespace-nowrap"
                          >
                            {upiVerified ? (
                              <span className="flex items-center justify-center gap-1.5">
                                <Check size={14} /> Verified
                              </span>
                            ) : (
                              "Verify"
                            )}
                          </button>
                        </div>
                      )}

                      {selected && m.id === "card" && (
                        <div className="mt-2 ml-0 sm:ml-4 p-4 rounded-xl bg-[#FBF7F0] border border-[#EDE3D2] grid sm:grid-cols-2 gap-3">
                          <input
                            placeholder="Card number"
                            value={card.number}
                            onChange={(e) => setCard({ ...card, number: formatCard(e.target.value) })}
                            className="sm:col-span-2 border border-[#EDE3D2] rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#9E1B32] bg-white"
                          />
                          <input
                            placeholder="Name on card"
                            value={card.name}
                            onChange={(e) => setCard({ ...card, name: e.target.value })}
                            className="sm:col-span-2 border border-[#EDE3D2] rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#9E1B32] bg-white"
                          />
                          <input
                            placeholder="MM/YY"
                            value={card.expiry}
                            onChange={(e) => setCard({ ...card, expiry: formatExpiry(e.target.value) })}
                            className="border border-[#EDE3D2] rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#9E1B32] bg-white"
                          />
                          <input
                            placeholder="CVV"
                            value={card.cvv}
                            onChange={(e) => setCard({ ...card, cvv: e.target.value.replace(/\D/g, "").slice(0, 3) })}
                            className="border border-[#EDE3D2] rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#9E1B32] bg-white"
                          />
                        </div>
                      )}

                      {selected && m.id === "netbanking" && (
                        <div className="mt-2 ml-0 sm:ml-4 p-4 rounded-xl bg-[#FBF7F0] border border-[#EDE3D2]">
                          <select
                            value={bank}
                            onChange={(e) => setBank(e.target.value)}
                            className="w-full border border-[#EDE3D2] rounded-lg px-3.5 py-2.5 text-sm bg-white focus:outline-none focus:border-[#9E1B32]"
                          >
                            {BANKS.map((b) => (
                              <option key={b}>{b}</option>
                            ))}
                          </select>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </SectionCard>

            {/* Add-ons */}
            <SectionCard>
              <h2 className="font-display text-lg mb-4">Extras</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Toggle checked={giftWrap} onChange={() => setGiftWrap((g) => !g)} />
                  <Gift size={16} className="text-[#B6883E] shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Gift packaging — {formatINR(150)}</p>
                    <p className="text-xs text-[#8A7E70]">RITVAA signature box with a satin ribbon and a note card.</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Toggle checked={protectShipment} onChange={() => setProtectShipment((p) => !p)} />
                  <ShieldCheck size={16} className="text-[#B6883E] shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Shipment protection — {formatINR(299)}</p>
                    <p className="text-xs text-[#8A7E70]">Full refund or replacement if lost or damaged in transit.</p>
                  </div>
                </div>
              </div>
            </SectionCard>
          </div>

          {/* Sidebar — desktop summary */}
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <SectionCard>
                <h2 className="font-display text-lg mb-4">Order Summary</h2>
                <div className="flex gap-3 mb-5">
                  <img
                    src={ORDER_ITEM.image}
                    alt={ORDER_ITEM.name}
                    className="w-16 h-16 rounded-lg object-cover border border-[#EDE3D2]"
                  />
                  <div className="text-sm">
                    <p className="font-medium leading-snug">{ORDER_ITEM.name}</p>
                    <p className="text-xs text-[#8A7E70] mt-0.5">{ORDER_ITEM.variant}</p>
                    <p className="text-xs text-[#8A7E70]">Qty: {ORDER_ITEM.qty}</p>
                  </div>
                </div>

                <OrderSummaryBody
                  subtotal={subtotal}
                  gst={gst}
                  giftCost={giftCost}
                  protectCost={protectCost}
                  discount={discount}
                  total={total}
                  coupon={coupon}
                  setCoupon={setCoupon}
                  applyCoupon={applyCoupon}
                  couponMsg={couponMsg}
                />

                <button
                  onClick={placeOrder}
                  disabled={!canPlaceOrder}
                  className={`w-full mt-5 py-3.5 rounded-full font-medium transition ${
                    canPlaceOrder ? "bg-[#9E1B32] text-white hover:bg-[#7E1527]" : "bg-[#EDE3D2] text-[#A89C89] cursor-not-allowed"
                  }`}
                >
                  Place Order · {formatINR(total)}
                </button>
                {!canPlaceOrder && (
                  <p className="text-xs text-[#8A7E70] text-center mt-2">Select an address & payment method to continue</p>
                )}

                <div className="flex items-center justify-center gap-1.5 text-xs text-[#8A7E70] mt-4">
                  <Lock size={12} /> 100% secure payments · BIS hallmark certified
                </div>
              </SectionCard>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sticky bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#EDE3D2] p-4 flex items-center gap-3 z-40">
        <div className="flex-1">
          <p className="text-[10px] text-[#8A7E70] uppercase tracking-wide">Total</p>
          <p className="font-display text-lg leading-none">{formatINR(total)}</p>
        </div>
        <button
          onClick={placeOrder}
          disabled={!canPlaceOrder}
          className={`px-6 py-3 rounded-full font-medium text-sm transition ${
            canPlaceOrder ? "bg-[#9E1B32] text-white" : "bg-[#EDE3D2] text-[#A89C89]"
          }`}
        >
          Place Order
        </button>
      </div>

      {/* Success overlay */}
      {orderPlaced && (
        <div className="fixed inset-0 bg-[#231B14]/60 flex items-center justify-center z-50 px-5">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center relative animate-pop">
            <button
              onClick={() => setOrderPlaced(false)}
              className="absolute top-4 right-4 text-[#8A7E70] hover:text-[#231B14]"
              aria-label="Close"
            >
              <X size={18} />
            </button>
            <div className="w-16 h-16 rounded-full bg-[#9E1B32]/10 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={32} className="text-[#9E1B32]" />
            </div>
            <h3 className="font-display text-2xl mb-2">Order Confirmed!</h3>
            <p className="text-sm text-[#5C5247] mb-4">
              Thank you for shopping with RITVAA. Your order <span className="font-medium text-[#231B14]">#{orderNumber}</span> has
              been placed.
            </p>
            <div className="bg-[#FBF7F0] rounded-xl p-3 text-sm text-[#5C5247] mb-5">
              Estimated delivery: <span className="font-medium text-[#231B14]">Fri, 26 Jun</span>
            </div>
            <button
              onClick={() => setOrderPlaced(false)}
              className="w-full bg-[#231B14] text-white font-medium py-3 rounded-full hover:bg-black transition"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyNowPage;