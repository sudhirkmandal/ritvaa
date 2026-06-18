import { useState, useRef, useEffect } from "react";

const slides = [
  {
    id: 1,
    label: "BRIDAL WEAR",
    img: "https://images.pexels.com/photos/1616096/pexels-photo-1616096.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 2,
    label: "OFFICE WEAR",
    img: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 3,
    label: "DAILY WEAR",
    img: "https://images.pexels.com/photos/1302307/pexels-photo-1302307.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 4,
    label: "PARTY WEAR",
    img: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 5,
    label: "FESTIVE WEAR",
    img: "https://images.pexels.com/photos/1246960/pexels-photo-1246960.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 6,
    label: "CASUAL WEAR",
    img: "https://images.pexels.com/photos/3586966/pexels-photo-3586966.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 7,
    label: "EVENING WEAR",
    img: "https://images.pexels.com/photos/10983783/pexels-photo-10983783.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

export default function ForEveryYou() {
  const [active, setActive] = useState(2); // start at index 2 (3rd item) = center
  const total = slides.length;
  const autoRef = useRef(null);

  const prev = () => setActive((p) => (p - 1 + total) % total);
  const next = () => setActive((p) => (p + 1) % total);

  // Auto-advance every 3s
  useEffect(() => {
    autoRef.current = setInterval(next, 3000);
    return () => clearInterval(autoRef.current);
  }, [active]);

  const resetAuto = () => {
    clearInterval(autoRef.current);
    autoRef.current = setInterval(next, 3000);
  };

  const handlePrev = () => { prev(); resetAuto(); };
  const handleNext = () => { next(); resetAuto(); };

  // Build visible 5-item window: [active-2, active-1, active, active+1, active+2]
  const getPos = (offset) => ((active + offset + total) % total);

  const positions = [
    { offset: -2, scale: 0.62, zIndex: 1, opacity: 0.45, x: "-170%", blur: 1 },
    { offset: -1, scale: 0.80, zIndex: 2, opacity: 0.75, x: "-88%",  blur: 0 },
    { offset:  0, scale: 1.00, zIndex: 5, opacity: 1.00, x:   "0%",  blur: 0 },
    { offset:  1, scale: 0.80, zIndex: 2, opacity: 0.75, x:  "88%",  blur: 0 },
    { offset:  2, scale: 0.62, zIndex: 1, opacity: 0.45, x: "170%",  blur: 1 },
  ];

  return (
    <section className="w-full py-12 overflow-hidden" style={{ backgroundColor: "#fff" }}>
      {/* Title */}
      <div className="text-center mb-10">
        <p className="text-xs tracking-widest uppercase mb-2" style={{ color: "#9a8070", letterSpacing: "0.3em" }}>
          Jewellery For
        </p>
        <h2
          className="text-2xl sm:text-3xl md:text-4xl font-light tracking-widest uppercase"
          style={{ color: "#8b1a1a", fontFamily: "Georgia, serif", letterSpacing: "0.2em" }}
        >
          For Every You
        </h2>
        <div className="mx-auto mt-3" style={{ width: "48px", height: "1px", backgroundColor: "#c9a96e" }} />
      </div>

      {/* Carousel */}
      <div className="relative flex items-center justify-center" style={{ height: "480px" }}>

        {/* Slides */}
        {positions.map(({ offset, scale, zIndex, opacity, x, blur }) => {
          const idx = getPos(offset);
          const slide = slides[idx];
          const isCenter = offset === 0;

          return (
            <div
              key={`${idx}-${offset}`}
              onClick={() => { if (!isCenter) { setActive(idx); resetAuto(); } }}
              style={{
                position: "absolute",
                width: "clamp(180px, 28vw, 340px)",
                height: isCenter ? "clamp(320px, 52vw, 460px)" : "clamp(260px, 42vw, 380px)",
                transform: `translateX(${x}) scale(${scale})`,
                zIndex,
                opacity,
                filter: blur ? `blur(${blur}px)` : "none",
                transition: "all 0.55s cubic-bezier(0.4,0,0.2,1)",
                cursor: isCenter ? "default" : "pointer",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: isCenter ? "0 20px 60px rgba(0,0,0,0.22)" : "0 6px 20px rgba(0,0,0,0.10)",
              }}
            >
              <img
                src={slide.img}
                alt={slide.label}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />

              {/* Label overlay */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: isCenter ? "32px 20px 20px" : "20px 16px 14px",
                  background: "linear-gradient(to top, rgba(15,5,2,0.75) 0%, transparent 100%)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <span
                  style={{
                    color: "#f5ede0",
                    fontFamily: "Georgia, serif",
                    fontSize: isCenter ? "clamp(13px, 2vw, 18px)" : "clamp(10px, 1.4vw, 14px)",
                    fontWeight: 400,
                    letterSpacing: "0.18em",
                  }}
                >
                  {slide.label}
                </span>
                <div style={{ width: isCenter ? "32px" : "20px", height: "1px", backgroundColor: "#c9a96e", transition: "width 0.4s" }} />
              </div>
            </div>
          );
        })}

        {/* Prev button */}
        <button
          onClick={handlePrev}
          className="absolute left-3 sm:left-6 flex items-center justify-center rounded-full transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none"
          style={{
            zIndex: 10,
            width: "44px",
            height: "44px",
            backgroundColor: "#fff",
            border: "1px solid #e0d0c0",
            boxShadow: "0 2px 12px rgba(0,0,0,0.10)",
            color: "#4a3728",
          }}
          aria-label="Previous"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: "16px", height: "16px" }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        {/* Next button */}
        <button
          onClick={handleNext}
          className="absolute right-3 sm:right-6 flex items-center justify-center rounded-full transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none"
          style={{
            zIndex: 10,
            width: "44px",
            height: "44px",
            backgroundColor: "#fff",
            border: "1px solid #e0d0c0",
            boxShadow: "0 2px 12px rgba(0,0,0,0.10)",
            color: "#4a3728",
          }}
          aria-label="Next"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: "16px", height: "16px" }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-8">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => { setActive(i); resetAuto(); }}
            aria-label={`Go to slide ${i + 1}`}
            className="rounded-full transition-all duration-300 focus:outline-none"
            style={{
              width: active === i ? "24px" : "8px",
              height: "8px",
              backgroundColor: active === i ? "#c9a96e" : "#d8cfc4",
              border: "none",
              padding: 0,
            }}
          />
        ))}
      </div>
    </section>
  );
}