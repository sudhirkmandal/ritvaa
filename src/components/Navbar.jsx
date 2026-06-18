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

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const menuData = {
    Collections: [
      "Rings",
      "Necklaces",
      "Earrings",
      "Bracelets",
      "Bridal Sets",
    ],
    Rings: [
      "Diamond Rings",
      "Gold Rings",
      "Engagement Rings",
      "Platinum Rings",
    ],
    Necklaces: [
      "Gold Necklace",
      "Diamond Necklace",
      "Choker Necklace",
      "Bridal Necklace",
    ],
    Earrings: [
      "Stud Earrings",
      "Hoop Earrings",
      "Drop Earrings",
      "Diamond Earrings",
    ],
    Bridal: [
      "Bridal Sets",
      "Wedding Jewellery",
      "Engagement Collection",
      "Luxury Bridal",
    ],
  };

  const navLinks = [
    "Home",
    "Collections",
    "Rings",
    "Necklaces",
    "Earrings",
    "Bridal",
    "Contact",
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/20 backdrop-blur-xl border-b border-white/10">
      <nav className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="h-20 flex items-center justify-between">
          {/* Logo */}
          <h1 className="text-3xl font-serif font-bold tracking-[0.25em] text-red-600">
            RITVAA
          </h1>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link} className="relative group">
                <a
                  href="#"
                  className="flex items-center gap-1 text-white hover:text-red-400 transition"
                >
                  {link}
                  {menuData[link] && <ChevronDown size={16} />}
                </a>

                {/* Mega Menu */}
                {menuData[link] && (
                  <div className="absolute left-1/2 top-full -translate-x-1/2 pt-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <div className="w-[850px] bg-white rounded-3xl shadow-2xl p-8">
                      <div className="grid grid-cols-3 gap-8">
                        {/* Links */}
                        <div>
                          <h3 className="font-semibold text-xl mb-4">
                            {link}
                          </h3>

                          <ul className="space-y-3">
                            {menuData[link].map((item) => (
                              <li key={item}>
                                <a
                                  href="#"
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
                            src="https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=800"
                            alt=""
                            className="h-64 w-full object-cover rounded-2xl"
                          />
                        </div>

                        {/* Promo */}
                        <div className="bg-red-50 rounded-2xl p-6 flex flex-col justify-center">
                          <span className="uppercase text-red-500 text-sm tracking-widest">
                            Exclusive
                          </span>

                          <h3 className="text-3xl font-serif mt-2">
                            Luxury Collection
                          </h3>

                          <p className="mt-3 text-gray-600">
                            Timeless jewellery crafted for elegance and beauty.
                          </p>

                          <button className="mt-5 bg-red-600 text-white px-5 py-3 rounded-full hover:bg-red-700 transition">
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

          {/* Icons */}
          <div className="hidden lg:flex items-center gap-5 text-white">
            <Search size={22} />
            <Heart size={22} />
            <ShoppingBag size={22} />
            <User size={22} />
          </div>

          {/* Mobile Button */}
          <button
            className="lg:hidden text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-black/90 backdrop-blur-xl rounded-2xl p-6 mb-4">
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-white block hover:text-red-400 transition"
                  >
                    {link}
                  </a>

                  {menuData[link] && (
                    <ul className="ml-4 mt-2 space-y-2">
                      {menuData[link].map((item) => (
                        <li key={item}>
                          <a
                            href="#"
                            className="text-gray-300 text-sm hover:text-red-400"
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

            <div className="flex gap-5 mt-6 text-white">
              <Search size={22} />
              <Heart size={22} />
              <ShoppingBag size={22} />
              <User size={22} />
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;