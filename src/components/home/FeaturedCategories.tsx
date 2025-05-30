import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const categories = [
  {
    id: 1,
    name: "إلكترونيات",
    image: "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?q=80&w=2025&auto=format&fit=crop",
    slug: "electronics",
    itemCount: 150,
  },
  {
    id: 2,
    name: "ملابس",
    image: "https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?q=80&w=2009&auto=format&fit=crop",
    slug: "clothing",
    itemCount: 320,
  },
  {
    id: 3,
    name: "كتب",
    image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2030&auto=format&fit=crop",
    slug: "books",
    itemCount: 210,
  },
  {
    id: 4,
    name: "أثاث",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2158&auto=format&fit=crop",
    slug: "furniture",
    itemCount: 85,
  },
  {
    id: 5,
    name: "هدايا",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=2040&auto=format&fit=crop",
    slug: "gifts",
    itemCount: 120,
  },
];

const FeaturedCategories = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 5; // Number of items to show at once
  const totalSlides = Math.ceil(categories.length / itemsPerView);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-8">تسوق حسب الفئة</h2>
        
        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {categories.map((category) => (
                <div 
                  key={category.id} 
                  className="min-w-[20%] px-2"
                >
                  <Link
                    to={`/categories/${category.slug}`}
                    className="group relative overflow-hidden rounded-lg block"
                  >
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                      <h3 className="text-xl font-bold text-white">{category.name}</h3>
                      <p className="text-sm text-gray-200">{category.itemCount} منتج</p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          <Button
            onClick={prevSlide}
            className="absolute top-1/2 right-0 transform -translate-y-1/2 -translate-x-4 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors"
            aria-label="Previous categories"
          >
            <ChevronRight size={24} className="text-bloom-navy" />
          </Button>
          <Button
            onClick={nextSlide}
            className="absolute top-1/2 left-0 transform -translate-y-1/2 translate-x-4 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors"
            aria-label="Next categories"
          >
            <ChevronLeft size={24} className="text-bloom-navy" />
          </Button>

          {/* Slide indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {[...Array(totalSlides)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-bloom-gold w-8"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
