import { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";

const slides = [
  {
    image:
      "https://ritvaa.in/cdn/shop/files/6th_Banner_Desktop.jpg?v=1780488237&width=2000",
    mobileImage:
      "https://ritvaa.in/cdn/shop/files/6th_Banner_Mobile.jpg?v=1780488262&width=1100",
    title: "Timeless Elegance",
    desc: "Discover jewellery crafted for every special moment.",
  },
  {
    image:
      "https://i.pinimg.com/736x/98/c0/23/98c02301aacaec39c7e1d0e4cffe2431.jpg",
    mobileImage:
      "https://i.pinimg.com/736x/98/c0/23/98c02301aacaec39c7e1d0e4cffe2431.jpg",
    title: "Royal Diamond Collection",
    desc: "Experience brilliance that lasts forever.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=2000",
    mobileImage:
      "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=1100",
    title: "Gold Heritage Designs",
    desc: "Tradition meets modern luxury.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=2000",
    mobileImage:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1100",
    title: "Bridal Luxury",
    desc: "Make your special day unforgettable.",
  },
];

const Hero = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const [swiperReady, setSwiperReady] = useState(false);

  useEffect(() => {
    setSwiperReady(true);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">

      {swiperReady && (
        <Swiper
          modules={[Autoplay, Navigation]}
          loop={true}
          speed={1200}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          onSwiper={(swiper) => {
            setTimeout(() => {
              swiper.navigation.destroy();
              swiper.navigation.init();
              swiper.navigation.update();
            });
          }}
          className="h-full w-full"
        >
          {slides.map((slide, i) => (
            <SwiperSlide key={i}>
              <div className="relative h-screen w-full overflow-hidden">

                <div
                  className="absolute inset-0 bg-cover bg-center scale-105 transition-transform duration-[6000ms]"
                  style={{
                    backgroundImage: `url(${
                      window.innerWidth < 768
                        ? slide.mobileImage
                        : slide.image
                    })`,
                  }}
                />

              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {/* ARROWS */}
      <button
        ref={prevRef}
        className="hidden md:flex cursor-pointer absolute left-6 top-1/2 -translate-y-1/2 z-50 w-14 h-14 rounded-full bg-white/20 backdrop-blur-xl text-white items-center justify-center hover:bg-white hover:text-black transition"
      >
        <ChevronLeft size={26} />
      </button>

      <button
        ref={nextRef}
        className="hidden md:flex cursor-pointer absolute right-6 top-1/2 -translate-y-1/2 z-50 w-14 h-14 rounded-full bg-white/20 backdrop-blur-xl text-white items-center justify-center hover:bg-white hover:text-black transition"
      >
        <ChevronRight size={26} />
      </button>

    </section>
  );
};

export default Hero;