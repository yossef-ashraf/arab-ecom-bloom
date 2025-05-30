// src/pages/Products.tsx
import { useEffect, useState } from 'react';
import { getCategories } from '../services/api';
import { Category } from '../types';
import { Link } from "react-router-dom";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 5;

  useEffect(() => {
    getCategories()
      .then((categories) => {
        const mapped: Category[] = categories.map((category: any) => ({
          id: category.id,
          name: category.data || 'غير مصنف',
          image: category.image_url || "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2030&auto=format&fit=crop",
          itemCount: category.items_count
        }));

        setCategories(mapped);
      })
      .catch((err) => console.error('Error loading books:', err))
      .finally(() => setLoading(false));
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + itemsPerView;
      return nextIndex >= categories.length ? 0 : nextIndex;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex - itemsPerView;
      return nextIndex < 0 ? Math.max(0, categories.length - itemsPerView) : nextIndex;
    });
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [categories.length]);

  if (loading) return <p className="p-4">Loading...</p>;

  const visibleCategories = categories.slice(currentIndex, currentIndex + itemsPerView);

  return (
    <section className="py-16">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-8">تسوق حسب الفئة</h2>
        
        <div className="relative">
          <div className="grid grid-cols-5 gap-4">
            {visibleCategories.map((category) => (
              <Link
                key={category.id}
                to={`/categories/${category.id}`}
                className="group relative overflow-hidden rounded-lg"
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
            ))}
          </div>

          {/* Navigation buttons */}
          <Button
            onClick={prevSlide}
            className="absolute top-1/2 right-0 transform -translate-y-1/2 -translate-x-4 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors z-10"
            aria-label="Previous categories"
          >
            <ChevronRight size={24} className="text-bloom-navy" />
          </Button>
          <Button
            onClick={nextSlide}
            className="absolute top-1/2 left-0 transform -translate-y-1/2 translate-x-4 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors z-10"
            aria-label="Next categories"
          >
            <ChevronLeft size={24} className="text-bloom-navy" />
          </Button>

          {/* Slide indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
            {[...Array(Math.ceil(categories.length / itemsPerView))].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index * itemsPerView)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === Math.floor(currentIndex / itemsPerView)
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

export default Categories;