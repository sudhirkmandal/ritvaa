import { useState } from "react";
import logo from "../assets/logo.png"

const footerLinks = {
  "Quick Links": [
    "Home", "About Us", "Best Sellers", "New Arrivals", "Sale"
  ],
  "Collections": [
    "Rings", "Earrings", "Necklaces", "Bangles", "Bracelets", "Mangalsutra", "Chains", "Pendants"
  ],
  "Customer Care": [
    "Track My Order", "Returns & Exchange", "Size Guide", "Care Instructions", "FAQs", "Contact Us"
  ],
};

const socialLinks = [
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="12" r="4" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "#",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
      </svg>
    ),
  },
  {
    label: "Pinterest",
    href: "#",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C6.477 2 2 6.477 2 12c0 4.236 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.181-.78 1.172-4.97 1.172-4.97s-.299-.598-.299-1.482c0-1.388.806-2.428 1.808-2.428.853 0 1.267.64 1.267 1.408 0 .858-.546 2.141-.828 3.329-.236.995.499 1.806 1.476 1.806 1.771 0 3.132-1.867 3.132-4.562 0-2.387-1.715-4.057-4.163-4.057-2.836 0-4.5 2.126-4.5 4.323 0 .856.33 1.772.741 2.273a.3.3 0 01.069.283c-.076.31-.243.995-.276 1.134-.044.183-.146.222-.337.134-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.966-.527-2.292-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 5.523 0 10-4.477 10-10S17.523 2 12 2z"/>
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "#",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z"/>
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

const paymentIcons = ["Visa", "Mastercard", "UPI", "RuPay", "COD"];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [openSection, setOpenSection] = useState(null);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  const toggleSection = (key) => {
    setOpenSection((prev) => (prev === key ? null : key));
  };

  return (
    <footer style={{ backgroundColor: "#1a0a05", color: "#e8dcc8" }}>

      {/* ── Newsletter Banner ── */}
      <div
        className="w-full py-10 px-4"
        style={{ background: "linear-gradient(135deg, #3d0f0f 0%, #6b1a1a 50%, #3d0f0f 100%)", borderBottom: "1px solid #4a2020" }}
      >
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs tracking-widest uppercase mb-2" style={{ color: "#c9a96e" }}>Exclusive Offers Await</p>
          <h3
            className="text-xl sm:text-2xl font-semibold mb-2"
            style={{ color: "#f5ede0", fontFamily: "Georgia, serif" }}
          >
            Join the RITVAA Family
          </h3>
          <p className="text-sm mb-6" style={{ color: "#c4b49a" }}>
            Subscribe to receive early access to new collections, special offers &amp; styling tips.
          </p>
          {subscribed ? (
            <div className="flex items-center justify-center gap-2" style={{ color: "#c9a96e" }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm font-medium">You're subscribed! Welcome to the family.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-4 py-3 text-sm rounded-full focus:outline-none"
                style={{
                  backgroundColor: "rgba(255,255,255,0.08)",
                  border: "1px solid #5a3030",
                  color: "#f5ede0",
                  caretColor: "#c9a96e",
                }}
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-full text-sm font-semibold tracking-wider uppercase transition-all duration-200 hover:opacity-90 active:scale-95"
                style={{ backgroundColor: "#c9a96e", color: "#1a0a05", border: "none", whiteSpace: "nowrap" }}
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>

      {/* ── Main Footer ── */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand Column */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <div className="mb-5">
              {/* <h2
                className="text-3xl font-bold tracking-widest"
                style={{ color: "#c9a96e", fontFamily: "Georgia, serif", letterSpacing: "0.25em" }}
              >
                RITVAA
              </h2> */}
              <img src={logo} className="h-13" alt="" />
              <div className="mt-1" style={{ width: "40px", height: "1px", backgroundColor: "#c9a96e" }} />
            </div>

            <p className="text-sm leading-relaxed mb-6" style={{ color: "#a8957e", maxWidth: "280px" }}>
              Crafting timeless jewellery that celebrates every precious moment. Each piece is a blend of tradition, artistry, and love — made to be treasured forever.
            </p>

            {/* Contact */}
            <div className="flex flex-col gap-3 mb-6">
              {[
                { icon: "📍", text: "12, Jewellers Lane, Mumbai – 400001" },
                { icon: "📞", text: "+91 98765 43210" },
                { icon: "✉️", text: "hello@ritvaa.com" },
              ].map(({ icon, text }) => (
                <div key={text} className="flex items-start gap-3">
                  <span className="text-sm mt-0.5">{icon}</span>
                  <span className="text-sm" style={{ color: "#a8957e" }}>{text}</span>
                </div>
              ))}
            </div>

            {/* Social icons */}
            <div className="flex gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex items-center justify-center w-9 h-9 rounded-full transition-all duration-200 hover:scale-110"
                  style={{ border: "1px solid #4a2a1a", color: "#c9a96e", backgroundColor: "rgba(201,169,110,0.07)" }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#c9a96e"; e.currentTarget.style.color = "#1a0a05"; }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = "rgba(201,169,110,0.07)"; e.currentTarget.style.color = "#c9a96e"; }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns — Desktop */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="hidden md:block">
              <h4
                className="text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ color: "#c9a96e", letterSpacing: "0.15em" }}
              >
                {title}
              </h4>
              <ul className="flex flex-col gap-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm transition-all duration-150 hover:pl-1"
                      style={{ color: "#a8957e", textDecoration: "none", display: "inline-block" }}
                      onMouseEnter={e => { e.currentTarget.style.color = "#c9a96e"; }}
                      onMouseLeave={e => { e.currentTarget.style.color = "#a8957e"; }}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Link Columns — Mobile Accordion */}
          <div className="md:hidden col-span-1 flex flex-col gap-2">
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title} style={{ borderBottom: "1px solid #2e1a10" }}>
                <button
                  onClick={() => toggleSection(title)}
                  className="w-full flex items-center justify-between py-3 text-left focus:outline-none"
                  style={{ backgroundColor: "transparent", border: "none", color: "#c9a96e" }}
                >
                  <span className="text-xs font-semibold uppercase tracking-widest" style={{ letterSpacing: "0.15em" }}>
                    {title}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"
                    className="w-4 h-4 transition-transform duration-200"
                    style={{ transform: openSection === title ? "rotate(180deg)" : "rotate(0deg)" }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
                {openSection === title && (
                  <ul className="pb-3 flex flex-col gap-2 pl-2">
                    {links.map((link) => (
                      <li key={link}>
                        <a href="#" className="text-sm" style={{ color: "#a8957e", textDecoration: "none" }}>
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* ── Divider ── */}
      <div className="max-w-6xl mx-auto px-4">
        <div style={{ height: "1px", backgroundColor: "#2e1a10" }} />
      </div>

      {/* ── Bottom Bar ── */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

          {/* Copyright */}
          <p className="text-xs text-center sm:text-left" style={{ color: "#6b5040" }}>
            © {new Date().getFullYear()} RITVAA. All rights reserved. Crafted with{" "}
            <span style={{ color: "#8b1a1a" }}>♥</span> in India.
          </p>

          {/* Payment icons */}
          <div className="flex items-center gap-2 flex-wrap justify-center">
            <span className="text-xs mr-1" style={{ color: "#6b5040" }}>We accept:</span>
            {paymentIcons.map((p) => (
              <span
                key={p}
                className="px-2 py-1 text-xs font-medium rounded"
                style={{ backgroundColor: "#2a1208", color: "#c9a96e", border: "1px solid #3a1e0e" }}
              >
                {p}
              </span>
            ))}
          </div>

          {/* Policy links */}
          <div className="flex gap-4 text-xs" style={{ color: "#6b5040" }}>
            {["Privacy Policy", "Terms of Use"].map((p) => (
              <a
                key={p}
                href="#"
                style={{ color: "#6b5040", textDecoration: "none" }}
                onMouseEnter={e => { e.currentTarget.style.color = "#c9a96e"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "#6b5040"; }}
              >
                {p}
              </a>
            ))}
          </div>

        </div>
      </div>

    </footer>
  );
}