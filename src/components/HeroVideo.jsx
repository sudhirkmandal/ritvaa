import React from "react";
import video1 from "../assets/vdo-1.mp4";

const HeroVideo = () => {
  return (
    <section className="w-full relative overflow-hidden">

      {/* VIDEO BACKGROUND */}
      <video
        className="w-full h-[85vh] object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={video1} type="video/mp4" />
      </video>

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20"></div>

      {/* CONTENT */}
      <div className="absolute inset-0 flex items-center">
        <div className="px-6 md:px-16 max-w-2xl text-white">

          <p className="text-[#C8A96A] tracking-[6px] text-xs uppercase">
            Premium Jewellery Collection
          </p>

          <h1
            className="mt-4 text-4xl md:text-6xl leading-tight"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Royal Bridal <br /> Elegance Collection
          </h1>

          <p className="mt-6 text-gray-300 text-sm md:text-base">
            Experience timeless gold & diamond jewellery crafted for modern luxury.
          </p>

          <div className="mt-8 flex gap-4">

            <button className="px-8 py-3 bg-[#C8A96A] text-black text-sm tracking-widest uppercase hover:bg-[#D6B46D] transition">
              Shop Collection
            </button>

            <button className="px-8 py-3 border border-[#C8A96A] text-[#C8A96A] text-sm tracking-widest uppercase hover:bg-[#C8A96A] hover:text-black transition">
              View Lookbook
            </button>

          </div>

        </div>
      </div>

    </section>
  );
};

export default HeroVideo;