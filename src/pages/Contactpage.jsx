import { useState } from "react";
import {
  Mail,
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  ChevronDown,
//   Instagram,
//   Facebook,
//   Twitter,
  Gem,
  Calendar,
} from "lucide-react";

/* ---------------------------------------------------------
   Static content — edit freely to match your real details.
--------------------------------------------------------- */
const SUBJECTS = ["General Inquiry", "Custom Order", "Repair & Resizing", "Book Appointment", "Other"];

const TIME_SLOTS = ["11:00 AM", "1:00 PM", "3:00 PM", "5:00 PM", "7:00 PM"];

const nextDays = Array.from({ length: 5 }).map((_, i) => {
  const d = new Date();
  d.setDate(d.getDate() + i + 1);
  return d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" });
});

const STORE_HOURS = [
  ["Monday – Friday", "10:00 AM – 8:00 PM"],
  ["Saturday", "10:00 AM – 8:00 PM"],
  ["Sunday", "11:00 AM – 6:00 PM"],
];

const FAQS = [
  {
    q: "Is all your jewellery BIS Hallmarked?",
    a: "Yes — every gold and platinum piece we sell carries a BIS hallmark, and pieces with diamonds also ship with an IGI certificate.",
  },
  {
    q: "Can I get a piece customized?",
    a: "Absolutely. Choose \"Custom Order\" in the form and tell us what you have in mind — our design team will reach out to discuss metal, stones, and sizing.",
  },
  {
    q: "What's your return & exchange policy?",
    a: "We offer 15-day easy returns on unworn pieces in original packaging, plus a lifetime exchange program on gold jewellery.",
  },
  {
    q: "Do you offer ring or bracelet resizing?",
    a: "Yes, free of charge for the first year from purchase. Bring your piece to any boutique or mail it in using our prepaid service.",
  },
  {
    q: "How do I book a private appointment?",
    a: "Select \"Book Appointment\" in the form below, pick a date and time that works for you, and our concierge will confirm by phone or email.",
  },
];

/* ---------------------------------------------------------
   Small building blocks
--------------------------------------------------------- */
const SectionCard = ({ children, className = "" }) => (
  <div className={`bg-white border border-[#EDE3D2] rounded-2xl p-6 sm:p-7 ${className}`}>{children}</div>
);

const InfoCard = ({ icon: Icon, title, children, action }) => (
  <div className="flex gap-4 bg-white border border-[#EDE3D2] rounded-2xl p-5">
    <div className="w-11 h-11 rounded-full bg-[#9E1B32]/10 flex items-center justify-center shrink-0">
      <Icon size={18} className="text-[#9E1B32]" />
    </div>
    <div className="min-w-0">
      <p className="text-sm font-medium text-[#231B14] mb-0.5">{title}</p>
      <div className="text-sm text-[#5C5247] leading-relaxed">{children}</div>
      {action}
    </div>
  </div>
);

/* ---------------------------------------------------------
   Main component
--------------------------------------------------------- */
const ContactPage = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: SUBJECTS[0], date: "", time: "", message: "" });
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [refNumber, setRefNumber] = useState("");
  const [openFAQ, setOpenFAQ] = useState(0);

  const update = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const handleSubmit = () => {
    if (!form.name || !form.email.includes("@") || !form.message) {
      setError("Please fill in your name, a valid email, and a message before sending.");
      return;
    }
    if (form.subject === "Book Appointment" && (!form.date || !form.time)) {
      setError("Please pick a date and time for your appointment.");
      return;
    }
    setError("");
    setRefNumber("RTV-MSG-" + Date.now().toString().slice(-6));
    setSubmitted(true);
  };

  const resetForm = () => {
    setForm({ name: "", email: "", phone: "", subject: SUBJECTS[0], date: "", time: "", message: "" });
    setSubmitted(false);
  };

  return (
    <div className="font-ui bg-[#FBF7F0] text-[#231B14] min-h-screen pb-20">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500&family=Inter:wght@400;500;600;700&display=swap');
        .font-display { font-family: 'Playfair Display', Georgia, serif; }
        .font-ui { font-family: 'Inter', system-ui, sans-serif; }
        @keyframes popIn { 0% { transform: scale(0.7); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
        .animate-pop { animation: popIn 0.35s ease-out; }
      `}</style>

      <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-24 lg:pt-28">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#B6883E] mb-3">We'd love to hear from you</p>
          <h1 className="font-display text-3xl sm:text-4xl mb-3">Get in Touch</h1>
          <p className="text-sm text-[#5C5247]">
            Questions about an order, a custom design in mind, or just want to say hello — our team usually replies within a day.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
          {/* Form */}
          <div className="lg:col-span-3">
            <SectionCard>
              {!submitted ? (
                <>
                  <h2 className="font-display text-xl mb-5">Send us a Message</h2>

                  <p className="text-xs font-semibold uppercase tracking-wide text-[#8A7E70] mb-2">What's this about?</p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {SUBJECTS.map((s) => (
                      <button
                        key={s}
                        onClick={() => update("subject", s)}
                        className={`px-3.5 py-2 rounded-full text-sm border transition ${
                          form.subject === s
                            ? "border-[#9E1B32] bg-[#9E1B32]/5 text-[#9E1B32] font-medium"
                            : "border-[#EDE3D2] text-[#5C5247] hover:border-[#D8CBB0]"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>

                  {form.subject === "Book Appointment" && (
                    <div className="mb-5 p-4 rounded-xl bg-[#FBF7F0] border border-[#EDE3D2]">
                      <div className="flex items-center gap-2 mb-3">
                        <Calendar size={14} className="text-[#9E1B32]" />
                        <p className="text-xs font-semibold uppercase tracking-wide text-[#8A7E70]">Pick a date</p>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {nextDays.map((d) => (
                          <button
                            key={d}
                            onClick={() => update("date", d)}
                            className={`px-3 py-1.5 rounded-full text-xs border transition ${
                              form.date === d ? "border-[#9E1B32] bg-[#9E1B32]/5 text-[#9E1B32] font-medium" : "border-[#EDE3D2] text-[#5C5247]"
                            }`}
                          >
                            {d}
                          </button>
                        ))}
                      </div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-[#8A7E70] mb-2">Pick a time</p>
                      <div className="flex flex-wrap gap-2">
                        {TIME_SLOTS.map((t) => (
                          <button
                            key={t}
                            onClick={() => update("time", t)}
                            className={`px-3 py-1.5 rounded-full text-xs border transition ${
                              form.time === t ? "border-[#9E1B32] bg-[#9E1B32]/5 text-[#9E1B32] font-medium" : "border-[#EDE3D2] text-[#5C5247]"
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid sm:grid-cols-2 gap-3 mb-3">
                    <input
                      placeholder="Full name"
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      className="border border-[#EDE3D2] rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#9E1B32]"
                    />
                    <input
                      placeholder="Phone number"
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      className="border border-[#EDE3D2] rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#9E1B32]"
                    />
                  </div>
                  <input
                    placeholder="Email address"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    className="w-full border border-[#EDE3D2] rounded-lg px-3.5 py-2.5 text-sm mb-3 focus:outline-none focus:border-[#9E1B32]"
                  />
                  <textarea
                    placeholder="Tell us a little more..."
                    rows={4}
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    className="w-full border border-[#EDE3D2] rounded-lg px-3.5 py-2.5 text-sm mb-3 focus:outline-none focus:border-[#9E1B32] resize-none"
                  />

                  {error && <p className="text-xs text-[#9E1B32] mb-3">{error}</p>}

                  <button
                    onClick={handleSubmit}
                    className="w-full sm:w-auto bg-[#9E1B32] text-white font-medium px-7 py-3 rounded-full hover:bg-[#7E1527] transition flex items-center justify-center gap-2"
                  >
                    Send Message <Send size={15} />
                  </button>
                </>
              ) : (
                <div className="text-center py-6 animate-pop">
                  <div className="w-16 h-16 rounded-full border-2 border-dashed border-[#B6883E] flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={28} className="text-[#9E1B32]" />
                  </div>
                  <h3 className="font-display text-xl mb-2">Message Sent</h3>
                  <p className="text-sm text-[#5C5247] max-w-sm mx-auto mb-1">
                    Thank you, {form.name.split(" ")[0] || "there"}. Our team will get back to you shortly
                    {form.subject === "Book Appointment" && form.date && form.time ? ` to confirm your appointment on ${form.date} at ${form.time}.` : "."}
                  </p>
                  <p className="text-xs text-[#8A7E70] mb-6">Reference: {refNumber}</p>
                  <button onClick={resetForm} className="text-sm font-medium text-[#9E1B32] hover:underline">
                    Send another message
                  </button>
                </div>
              )}
            </SectionCard>
          </div>

          {/* Contact info */}
          <div className="lg:col-span-2 space-y-4">
            <InfoCard icon={Phone} title="Call Us">
              +91 22 4567 8900
              <br />
              Mon – Sat, 10am – 8pm
            </InfoCard>

            <InfoCard
              icon={MessageCircle}
              title="WhatsApp"
              action={
                <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="text-xs font-medium text-[#9E1B32] hover:underline">
                  Start a chat →
                </a>
              }
            >
              +91 98765 43210
              <br />
              Chat with our jewellery consultants
            </InfoCard>

            <InfoCard icon={Mail} title="Email">
              hello@ritvaa.com
              <br />
              We reply within 24 hours
            </InfoCard>

            <InfoCard
              icon={MapPin}
              title="Visit Our Boutique"
              action={
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Bandra+Kurla+Complex+Mumbai"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-medium text-[#9E1B32] hover:underline"
                >
                  Get directions →
                </a>
              }
            >
              3rd Floor, Atrium Tower, Bandra Kurla Complex,
              <br />
              Mumbai, Maharashtra 400051
            </InfoCard>

            <div className="bg-white border border-[#EDE3D2] rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Clock size={16} className="text-[#9E1B32]" />
                <p className="text-sm font-medium">Store Hours</p>
              </div>
              <div className="space-y-1.5">
                {STORE_HOURS.map(([day, hrs]) => (
                  <div key={day} className="flex justify-between text-sm text-[#5C5247]">
                    <span>{day}</span>
                    <span className="text-[#231B14] font-medium">{hrs}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-16 max-w-3xl mx-auto">
          <h2 className="font-display text-2xl text-center mb-6">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {FAQS.map((f, i) => (
              <div key={i} className="bg-white border border-[#EDE3D2] rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFAQ(openFAQ === i ? -1 : i)}
                  className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left"
                >
                  <span className="text-sm font-medium">{f.q}</span>
                  <ChevronDown size={16} className={`shrink-0 text-[#8A7E70] transition-transform ${openFAQ === i ? "rotate-180" : ""}`} />
                </button>
                {openFAQ === i && <p className="px-5 pb-4 text-sm text-[#5C5247] leading-relaxed">{f.a}</p>}
              </div>
            ))}
          </div>
        </div>

        {/* Social */}
        <div className="mt-16 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Gem size={16} className="text-[#B6883E]" />
            <p className="text-sm font-medium text-[#231B14]">Follow RITVAA Fine Jewellery</p>
          </div>
          <div className="flex items-center justify-center gap-3">
            {[].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-10 h-10 rounded-full border border-[#EDE3D2] flex items-center justify-center text-[#5C5247] hover:border-[#9E1B32] hover:text-[#9E1B32] transition"
                aria-label="Social link"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;