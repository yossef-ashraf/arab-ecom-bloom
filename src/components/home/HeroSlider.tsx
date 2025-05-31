import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie"; // ✅ Add this to access the login token

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  image: string;
  bgColor: string;
}

const guestSlides: Slide[] = [
  {
    id: 1,
    title: "مرحبًا بك في عالم الكتب",
    subtitle: "سجل دخولك الآن للوصول إلى مكتبتك الشخصية وتتبع طلباتك",
    buttonText: "تسجيل الدخول",
    buttonLink: "/login",
    image: "https://images.unsplash.com/photo-1611078489935-0cb964deb7af?q=80&w=2070&auto=format&fit=crop",
    bgColor: "bg-bloom-navy",
  },
  {
    id: 2,
    title: "حسابك الشخصي",
    subtitle: "أدار طلباتك، عناوينك، وطرق الدفع الخاصة بك",
    buttonText: "عرض الملف الشخصي",
    buttonLink: "/dashboard",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=2070&auto=format&fit=crop",
    bgColor: "bg-bloom-teal",
  },
  {
    id: 3,
    title: "انضم إلينا اليوم",
    subtitle: "أنشئ حسابك الجديد واستمتع بمزايا حصرية",
    buttonText: "إنشاء حساب",
    buttonLink: "/register",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2070&auto=format&fit=crop",
    bgColor: "bg-bloom-coral",
  },
];

const loggedInSlides: Slide[] = [
  {
    id: 1,
    title: "مرحبًا بعودتك!",
    subtitle: "استعرض أحدث الكتب المضافة لمكتبتنا.",
    buttonText: "تصفح الكتب",
    buttonLink: "/products",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2070&auto=format&fit=crop",
    bgColor: "bg-bloom-navy",
  },
  {
    id: 2,
    title: "طلباتك السابقة",
    subtitle: "تتبع شحناتك واطلع على حالة الطلبات.",
    buttonText: "طلباتي",
    buttonLink: "/dashboard",
    image: "https://images.unsplash.com/photo-1533612608997-212b06408bb9?q=80&w=2070&auto=format&fit=crop",
    bgColor: "bg-bloom-teal",
  },
  {
    id: 3,
    title: "مكتبتك الخاصة",
    subtitle: "استعرض أحدث الفئات المضافة لمكتبتنا.",
    buttonText: "تصفح الفئات",
    buttonLink: "/categories",
    image: "https://images.unsplash.com/photo-1474367658825-e5858839e99d?q=80&w=2070&auto=format&fit=crop",
    bgColor: "bg-bloom-coral",
  },
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState<Slide[]>(guestSlides);

  useEffect(() => {
    const token = Cookies.get("access_token");

    if (token) {
      setSlides(loggedInSlides);
    } else {
      setSlides(guestSlides);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [slides]);

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
        onClick={() =>
          setCurrentSlide((prev) =>
            prev === 0 ? slides.length - 1 : prev - 1
          )
        }
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-all z-20"
        aria-label="Previous slide"
      >
        <ChevronLeft className="text-white" size={24} />
      </button>
      <button
        onClick={() =>
          setCurrentSlide((prev) =>
            prev === slides.length - 1 ? 0 : prev + 1
          )
        }
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