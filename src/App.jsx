import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ShopByCategory from "./components/ShopByCategory";
import HeroCollection from "./components/HeroVideo";
import BestSellers from "./components/BestSeller";
import ForEveryYou from "./components/Foreveryyou";
import BannerPage from "./components/BannerPage";
import Footer from "./components/Footer";

import BestSellerPage from "./pages/BestsellerPage";
import ProductDetailsPage from "./pages/Productdetailspage";

// Home Page Component
const Home = () => {
  return (
    <>
      <Hero />
      <ShopByCategory />
      <HeroCollection />
      <BestSellers />
      <ForEveryYou />
      <BannerPage />
    </>
  );
};

// Maps the exact label strings your Navbar passes to handleNav()
// (top-level links AND dropdown items) to real routes.
// Add an entry here every time you build a new page.
const ROUTE_MAP = {
  Home: "/",
  "Best Sellers": "/bestseller",
  "Product Details": "productdetails"
  // Collections: "/collections",
  // Rings: "/rings",
  // "Diamond Rings": "/rings/diamond",
  // ...etc as you build these pages out
};

const App = () => {
  const navigate = useNavigate();

  const handleNavigate = (label) => {
    const path = ROUTE_MAP[label];

    if (path) {
      navigate(path);
    } else {
      // No page exists for this label yet — don't silently do nothing.
      console.warn(`No route mapped for "${label}" — add it to ROUTE_MAP.`);
      navigate("/");
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Navbar onNavigate={handleNavigate} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bestseller" element={<BestSellerPage />} />
        <Route path="/productdetails" element={<ProductDetailsPage />} />
      </Routes>

      <Footer />
    </>
  );
};

export default App;