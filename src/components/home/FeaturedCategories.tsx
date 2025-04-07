
import { Link } from "react-router-dom";

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
  return (
    <section className="py-16">
      <div className="container mx-auto">
        <h2 className="section-title">تسوق حسب الفئة</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/categories/${category.slug}`}
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

export default FeaturedCategories;
