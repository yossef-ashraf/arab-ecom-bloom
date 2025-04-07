
import { useState } from "react";
import ProductCard from "../product/ProductCard";
import { Button } from "@/components/ui/button";
import { Product } from "@/types";

// Sample featured products data
const featuredProducts: Product[] = [
  {
    id: "1",
    name: "هاتف ذكي برو ماكس",
    price: 4999,
    discount: true,
    discountPrice: 4499,
    category: "إلكترونيات",
    image: "https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHNtYXJ0cGhvbmV8ZW58MHx8MHx8fDA%3D",
    rating: 4.8,
    description: "أحدث إصدار من الهواتف الذكية بميزات فائقة ومواصفات عالية",
    stock: 15,
  },
  {
    id: "2",
    name: "سماعات لاسلكية",
    price: 899,
    discount: true,
    discountPrice: 699,
    category: "إلكترونيات",
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4.5,
    description: "سماعات لاسلكية فاخرة مع إلغاء الضوضاء وجودة صوت استثنائية",
    stock: 25,
  },
  {
    id: "3",
    name: "ساعة ذكية",
    price: 1299,
    discount: false,
    discountPrice: 0,
    category: "إلكترونيات",
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=1772&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4.3,
    description: "ساعة ذكية متعددة الوظائف لمتابعة لياقتك وصحتك مع تصميم أنيق",
    stock: 18,
  },
  {
    id: "4",
    name: "قميص رجالي كلاسيك",
    price: 299,
    discount: true,
    discountPrice: 199,
    category: "ملابس",
    image: "https://images.unsplash.com/photo-1602810319428-019690571b5b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4.2,
    description: "قميص رجالي كلاسيكي بتصميم أنيق مناسب للمناسبات الرسمية",
    stock: 30,
  },
  {
    id: "5",
    name: "حذاء رياضي",
    price: 499,
    discount: false,
    discountPrice: 0,
    category: "ملابس",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4.6,
    description: "حذاء رياضي مريح بتصميم عصري مناسب للركض والتمارين الرياضية",
    stock: 22,
  },
  {
    id: "6",
    name: "حقيبة ظهر عصرية",
    price: 349,
    discount: true,
    discountPrice: 299,
    category: "إكسسوارات",
    image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4.4,
    description: "حقيبة ظهر عصرية مناسبة للاستخدام اليومي والسفر",
    stock: 19,
  },
  {
    id: "7",
    name: "كتاب تطوير الذات",
    price: 89,
    discount: false,
    discountPrice: 0,
    category: "كتب",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4.8,
    description: "كتاب قيم لتطوير الذات وتحسين مهارات الحياة",
    stock: 40,
  },
  {
    id: "8",
    name: "طاولة قهوة خشبية",
    price: 899,
    discount: true,
    discountPrice: 699,
    category: "أثاث",
    image: "https://images.unsplash.com/photo-1565631795047-79cc5e037ca9?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4.5,
    description: "طاولة قهوة خشبية بتصميم أنيق لغرفة المعيشة",
    stock: 8,
  },
];

const FeaturedProducts = () => {
  const [activeTab, setActiveTab] = useState("all");
  
  const tabs = [
    { id: "all", label: "جميع المنتجات" },
    { id: "electronics", label: "إلكترونيات" },
    { id: "clothing", label: "ملابس" },
    { id: "furniture", label: "أثاث" },
  ];
  
  const filteredProducts = activeTab === "all"
    ? featuredProducts
    : featuredProducts.filter(product => 
        product.category.toLowerCase() === activeTab || 
        (activeTab === "clothing" && 
         (product.category.toLowerCase() === "ملابس" || 
          product.category.toLowerCase() === "إكسسوارات"))
      );

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="section-title">منتجات مميزة</h2>
        
        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center mb-8 gap-2">
          {tabs.map(tab => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "outline"}
              className={`rounded-full px-6 ${
                activeTab === tab.id 
                  ? "bg-bloom-navy text-white" 
                  : "text-gray-700 hover:text-bloom-navy"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </Button>
          ))}
        </div>
        
        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button className="bg-bloom-gold text-bloom-navy hover:bg-bloom-sand px-8 py-6 text-lg">
            عرض جميع المنتجات
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
