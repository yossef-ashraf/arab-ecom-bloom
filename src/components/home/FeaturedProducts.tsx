
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { Product } from "@/types";
import ProductCard from "@/components/product/ProductCard";

const FeaturedProducts = () => {
  const { data: featuredProducts, isLoading, error } = useQuery({
    queryKey: ["featuredProducts"],
    queryFn: () => api.products.getFeatured(),
  });

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center text-bloom-navy mb-8">منتجات مميزة</h2>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-200 rounded-lg h-64 mb-4"></div>
                <div className="bg-gray-200 h-6 rounded mb-2 w-3/4"></div>
                <div className="bg-gray-200 h-4 rounded mb-2 w-1/2"></div>
                <div className="bg-gray-200 h-5 rounded w-1/4"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-8">
            حدث خطأ أثناء تحميل المنتجات المميزة. يرجى المحاولة مرة أخرى.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {featuredProducts?.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
        
      </div>
    </section>
  );
};

export default FeaturedProducts;
