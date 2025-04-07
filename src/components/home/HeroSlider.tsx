
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const slides = [
  {
    id: 1,
    title: "تخفيضات الصيف الكبرى",
    subtitle: "خصم يصل إلى 50% على جميع المنتجات",
    buttonText: "تسوق الآن",
    buttonLink: "/categories/offers",
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&auto=format&fit=crop",
    bgColor: "bg-bloom-navy",
  },
  {
    id: 2,
    title: "أحدث المنتجات",
    subtitle: "اكتشف وصول منتجات جديدة",
    buttonText: "استكشف",
    buttonLink: "/categories/new-arrivals",
    image: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?q=80&w=2030&auto=format&fit=crop",
    bgColor: "bg-bloom-teal",
  },
  {
    id: 3,
    title: "هدايا مميزة",
    subtitle: "لحظات خاصة تستحق أفضل الهدايا",
    buttonText: "تصفح الهدايا",
    buttonLink: "/categories/gifts",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=2040&auto=format&fit=crop",
    bgColor: "bg-bloom-coral",
  },
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[500px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div className={`relative h-full ${slide.bgColor}`}>
            <div
              className="absolute inset-0 bg-cover bg-center opacity-50"
              style={{ backgroundImage: `url(${slide.image})` }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-l from-black/60 to-transparent"></div>
            
            <div className="container h-full mx-auto flex items-center">
              <div className="max-w-lg text-white z-10 p-6">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-slide-in">
                  {slide.title}
                </h1>
                <p className="text-xl mb-8 animate-slide-in">{slide.subtitle}</p>
                <Button
                  asChild
                  className="bg-bloom-gold text-bloom-navy hover:bg-bloom-sand transition-all text-lg px-8 py-6 animate-slide-in"
                >
                  <Link to={slide.buttonLink}>{slide.buttonText}</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-all z-20"
        aria-label="Previous slide"
      >
        <ChevronLeft className="text-white" size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-all z-20"
        aria-label="Next slide"
      >
        <ChevronRight className="text-white" size={24} />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide
                ? "bg-bloom-gold w-8"
                : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
