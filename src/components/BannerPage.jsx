import React from "react";
import banner from "../assets/banner2.png";

const BannerPage = () => {
  return (
    <div className="w-full">

      <section className="w-full h-[96vh] overflow-hidden">

        <img
          src={banner}
          alt="Luxury Jewellery"
          className="w-full h-full object-center object-cover"
        />

      </section>

    </div>
  );
};

export default BannerPage;