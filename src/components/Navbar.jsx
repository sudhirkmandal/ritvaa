import { useState } from "react";
import {
  Menu,
  X,
  Search,
  Heart,
  ShoppingBag,
  User,
  ChevronDown,
} from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png"

const Navbar = ({ onNavigate }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMobileMenu, setOpenMobileMenu] = useState(null);

  const menuData = {
    Collections: ["Rings", "Necklaces", "Earrings", "Bracelets", "Bridal Sets"],
    Rings: ["Diamond Rings", "Gold Rings", "Engagement Rings", "Platinum Rings"],
    Necklaces: ["Gold Necklace", "Diamond Necklace", "Choker Necklace", "Bridal Necklace"],
    Earrings: ["Stud Earrings", "Hoop Earrings", "Drop Earrings", "Diamond Earrings"],
    Bridal: ["Bridal Sets", "Wedding Jewellery", "Engagement Collection", "Luxury Bridal"],
  };

  const navLinks = ["Home", "Collections", "Rings", "Necklaces", "Earrings", "Bridal", "Contact"];

  const handleNav = (link) => {
    setMobileOpen(false);
    setOpenMobileMenu(null);
    if (onNavigate) onNavigate(link);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/20 backdrop-blur-xl border-b border-white/10">
      <nav className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="h-20 flex items-center justify-between">

          {/* ── Logo ── */}
          {/* <h1
            className="text-3xl font-serif font-bold tracking-[0.25em] text-red-600 cursor-pointer select-none"
            onClick={() => handleNav("Home")}
            title="Go to Home"
          >
            RITVAA
          </h1> */}
          <Link to="/" onClick={() => handleNav("Home")}>
            <img
              src={logo}
              alt="RITVAA"
              className="h-13 w-auto object-contain cursor-pointer"
            />
          </Link>

          {/* ── Desktop Menu ── */}
          <ul className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link} className="relative group">
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); if (!menuData[link]) handleNav(link); }}
                  className="flex items-center gap-1 text-white hover:text-red-400 transition"
                >
                  {link}
                  {menuData[link] && <ChevronDown size={16} />}
                </a>

                {/* Mega dropdown */}
                {menuData[link] && (
                  <div className="absolute left-1/2 top-full -translate-x-1/2 pt-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <div className="w-[850px] bg-white rounded-3xl shadow-2xl p-8">
                      <div className="grid grid-cols-3 gap-8">
                        {/* Links */}
                        <div>
                          <h3 className="font-semibold text-xl mb-4">{link}</h3>
                          <ul className="space-y-3">
                            {menuData[link].map((item) => (
                              <li key={item}>
                                <a
                                  href="#"
                                  onClick={(e) => { e.preventDefault(); handleNav(item); }}
                                  className="text-gray-600 hover:text-red-600 transition"
                                >
                                  {item}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Image */}
                        <div>
                          <img
                            src="https://images.pexels.com/photos/1302307/pexels-photo-1302307.jpeg?auto=compress&cs=tinysrgb&w=600"
                            alt="Jewellery collection"
                            className="h-64 w-full object-cover rounded-2xl"
                          />
                        </div>

                        {/* Promo */}
                        <div className="bg-red-50 rounded-2xl p-6 flex flex-col justify-center">
                          <span className="uppercase text-red-500 text-sm tracking-widest">Exclusive</span>
                          <h3 className="text-3xl font-serif mt-2">Luxury Collection</h3>
                          <p className="mt-3 text-gray-600">Timeless jewellery crafted for elegance and beauty.</p>
                          <button
                            onClick={() => handleNav("Collections")}
                            className="mt-5 bg-red-600 text-white px-5 py-3 rounded-full hover:bg-red-700 transition"
                          >
                            Shop Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>

          {/* ── Icons ── */}
          <div className="hidden lg:flex items-center gap-5 text-white">
            <Search size={22} className="cursor-pointer hover:text-red-400 transition" />
            <Heart size={22} className="cursor-pointer hover:text-red-400 transition" />
            <ShoppingBag size={22} className="cursor-pointer hover:text-red-400 transition" />
            <User size={22} className="cursor-pointer hover:text-red-400 transition" />
          </div>

          {/* ── Mobile Hamburger ── */}
          <button
            className="lg:hidden text-white focus:outline-none"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>

        {/* ── Mobile Menu ── */}
        {mobileOpen && (
          <div className="lg:hidden bg-black/90 backdrop-blur-xl rounded-2xl p-6 mb-4">
            <ul className="space-y-1">
              {navLinks.map((link) => (
                <li key={link}>
                  <div
                    className="flex items-center justify-between py-2.5 border-b border-white/10 cursor-pointer"
                    onClick={() => {
                      if (menuData[link]) {
                        setOpenMobileMenu(openMobileMenu === link ? null : link);
                      } else {
                        handleNav(link);
                      }
                    }}
                  >
                    <span className="text-white font-medium hover:text-red-400 transition text-sm">
                      {link}
                    </span>
                    {menuData[link] && (
                      <ChevronDown
                        size={16}
                        className="text-white/60 transition-transform duration-200"
                        style={{ transform: openMobileMenu === link ? "rotate(180deg)" : "rotate(0deg)" }}
                      />
                    )}
                  </div>

                  {/* Mobile sub-items */}
                  {menuData[link] && openMobileMenu === link && (
                    <ul className="ml-3 mt-1 mb-2 space-y-2 border-l border-red-600/30 pl-3">
                      {menuData[link].map((item) => (
                        <li key={item}>
                          <a
                            href="#"
                            onClick={(e) => { e.preventDefault(); handleNav(item); }}
                            className="text-gray-300 text-sm hover:text-red-400 transition block py-1"
                          >
                            {item}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>

            <div className="flex gap-5 mt-5 pt-4 border-t border-white/10 text-white">
              <Search size={22} className="cursor-pointer hover:text-red-400 transition" />
              <Heart size={22} className="cursor-pointer hover:text-red-400 transition" />
              <ShoppingBag size={22} className="cursor-pointer hover:text-red-400 transition" />
              <User size={22} className="cursor-pointer hover:text-red-400 transition" />
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;