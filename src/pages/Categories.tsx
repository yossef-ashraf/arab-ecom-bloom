// src/pages/Products.tsx
import { useEffect, useState } from 'react';
import { getCategories } from '../services/api';
import { Category } from '../types';
import { Link } from "react-router-dom";


const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCategories()
      .then((categories) => {
        const mapped: Category[] = categories.map((category: any) => ({
          id: category.id,
          name: category.data || 'غير مصنف',
          image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2030&auto=format&fit=crop",
          itemCount:3
        }));

        setCategories(mapped);
      })
      .catch((err) => console.error('Error loading books:', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    
    <section className="py-16">
      <div className="container mx-auto">
        <h2 className="section-title">تسوق حسب الفئة</h2>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {categories.map((category) => (
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
    </div>
    </section>
  );
};

export default Categories;