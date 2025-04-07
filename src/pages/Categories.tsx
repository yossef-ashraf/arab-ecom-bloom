
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Filter, ChevronDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import ProductCard from "@/components/product/ProductCard";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Product } from "@/types";

// Sample products data
const sampleProducts: Product[] = [
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

const categoryMap: Record<string, string> = {
  electronics: "إلكترونيات",
  clothing: "ملابس",
  books: "كتب",
  furniture: "أثاث",
  gifts: "هدايا",
};

const Categories = () => {
  const { category } = useParams<{ category: string }>();
  const [sortBy, setSortBy] = useState("popular");
  const [priceRange, setPriceRange] = useState<string[]>([]);
  const [ratings, setRatings] = useState<number[]>([]);
  const [availability, setAvailability] = useState<string[]>([]);
  
  // Filter products by category
  const filteredProducts = sampleProducts.filter(product => {
    // Match by category
    if (category && category !== "offers" && category !== "new-arrivals" && category !== "best-sellers") {
      return product.category.toLowerCase() === categoryMap[category] || 
             (category === "clothing" && 
             (product.category.toLowerCase() === "ملابس" || 
              product.category.toLowerCase() === "إكسسوارات"));
    }
    
    // Special filters
    if (category === "offers") {
      return product.discount;
    }
    
    return true;
  });
  
  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low-high":
        const aPrice = a.discount ? a.discountPrice : a.price;
        const bPrice = b.discount ? b.discountPrice : b.price;
        return aPrice - bPrice;
      case "price-high-low":
        const aPrice2 = a.discount ? a.discountPrice : a.price;
        const bPrice2 = b.discount ? b.discountPrice : b.price;
        return bPrice2 - aPrice2;
      case "newest":
        return parseInt(b.id) - parseInt(a.id);
      case "rating":
        return b.rating - a.rating;
      default:
        return 0;
    }
  });
  
  const getCategoryName = () => {
    if (!category) return "جميع المنتجات";
    
    if (category === "offers") return "العروض والتخفيضات";
    if (category === "new-arrivals") return "وصل حديثاً";
    if (category === "best-sellers") return "الأكثر مبيعاً";
    
    return categoryMap[category] || "جميع المنتجات";
  };
  
  const togglePriceRange = (value: string) => {
    setPriceRange(prev => 
      prev.includes(value)
        ? prev.filter(p => p !== value)
        : [...prev, value]
    );
  };
  
  const toggleRating = (value: number) => {
    setRatings(prev => 
      prev.includes(value)
        ? prev.filter(r => r !== value)
        : [...prev, value]
    );
  };
  
  const toggleAvailability = (value: string) => {
    setAvailability(prev => 
      prev.includes(value)
        ? prev.filter(a => a !== value)
        : [...prev, value]
    );
  };
  
  const clearFilters = () => {
    setPriceRange([]);
    setRatings([]);
    setAvailability([]);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto">
          {/* Breadcrumbs */}
          <div className="mb-6">
            <nav className="flex text-sm text-gray-500">
              <Link to="/" className="hover:text-bloom-gold">الرئيسية</Link>
              <span className="mx-2">/</span>
              <span className="text-gray-900">{getCategoryName()}</span>
            </nav>
          </div>
          
          <h1 className="text-3xl font-bold text-bloom-navy mb-8">{getCategoryName()}</h1>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters - Desktop */}
            <div className="hidden lg:block w-64 h-fit bg-white rounded-lg shadow-sm p-6">
              <div className="mb-6">
                <h3 className="font-medium text-lg mb-4">تصفية النتائج</h3>
                <Separator className="mb-4" />
                
                <div className="mb-6">
                  <h4 className="font-medium mb-3">نطاق السعر</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Checkbox 
                        id="price-1" 
                        checked={priceRange.includes("0-100")} 
                        onCheckedChange={() => togglePriceRange("0-100")}
                      />
                      <label htmlFor="price-1" className="mr-2 text-sm text-gray-700">
                        أقل من 100 ر.س
                      </label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox 
                        id="price-2" 
                        checked={priceRange.includes("100-500")} 
                        onCheckedChange={() => togglePriceRange("100-500")}
                      />
                      <label htmlFor="price-2" className="mr-2 text-sm text-gray-700">
                        100 - 500 ر.س
                      </label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox 
                        id="price-3" 
                        checked={priceRange.includes("500-1000")} 
                        onCheckedChange={() => togglePriceRange("500-1000")}
                      />
                      <label htmlFor="price-3" className="mr-2 text-sm text-gray-700">
                        500 - 1000 ر.س
                      </label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox 
                        id="price-4" 
                        checked={priceRange.includes("1000+")} 
                        onCheckedChange={() => togglePriceRange("1000+")}
                      />
                      <label htmlFor="price-4" className="mr-2 text-sm text-gray-700">
                        أكثر من 1000 ر.س
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-medium mb-3">التقييم</h4>
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center">
                        <Checkbox 
                          id={`rating-${rating}`}
                          checked={ratings.includes(rating)}
                          onCheckedChange={() => toggleRating(rating)}
                        />
                        <label htmlFor={`rating-${rating}`} className="mr-2 text-sm text-gray-700 flex items-center">
                          {Array(5)
                            .fill(0)
                            .map((_, i) => (
                              <span key={i} className={`text-${i < rating ? "bloom-gold" : "gray-300"}`}>★</span>
                            ))}
                          {rating === 5 && <span className="mr-1">فما فوق</span>}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-medium mb-3">التوفر</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Checkbox 
                        id="in-stock" 
                        checked={availability.includes("in-stock")}
                        onCheckedChange={() => toggleAvailability("in-stock")}
                      />
                      <label htmlFor="in-stock" className="mr-2 text-sm text-gray-700">
                        متوفر
                      </label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox 
                        id="out-of-stock" 
                        checked={availability.includes("out-of-stock")}
                        onCheckedChange={() => toggleAvailability("out-of-stock")}
                      />
                      <label htmlFor="out-of-stock" className="mr-2 text-sm text-gray-700">
                        غير متوفر
                      </label>
                    </div>
                  </div>
                </div>
                
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="w-full text-gray-600"
                >
                  مسح الفلاتر
                </Button>
              </div>
            </div>
            
            {/* Products */}
            <div className="flex-1">
              {/* Sort and filter controls */}
              <div className="flex justify-between items-center mb-6">
                <div className="text-sm text-gray-500">
                  عرض {sortedProducts.length} من المنتجات
                </div>
                
                <div className="flex items-center space-x-4 space-x-reverse">
                  {/* Mobile filter button */}
                  <Drawer>
                    <DrawerTrigger asChild>
                      <Button variant="outline" className="lg:hidden">
                        <Filter size={18} className="ml-2" />
                        فلترة
                      </Button>
                    </DrawerTrigger>
                    <DrawerContent>
                      <div className="mx-auto w-full max-w-sm">
                        <DrawerHeader>
                          <DrawerTitle>تصفية النتائج</DrawerTitle>
                        </DrawerHeader>
                        <div className="p-4">
                          <div className="mb-6">
                            <h4 className="font-medium mb-3">نطاق السعر</h4>
                            <div className="space-y-2">
                              <div className="flex items-center">
                                <Checkbox 
                                  id="m-price-1" 
                                  checked={priceRange.includes("0-100")} 
                                  onCheckedChange={() => togglePriceRange("0-100")}
                                />
                                <label htmlFor="m-price-1" className="mr-2 text-sm text-gray-700">
                                  أقل من 100 ر.س
                                </label>
                              </div>
                              <div className="flex items-center">
                                <Checkbox 
                                  id="m-price-2" 
                                  checked={priceRange.includes("100-500")} 
                                  onCheckedChange={() => togglePriceRange("100-500")}
                                />
                                <label htmlFor="m-price-2" className="mr-2 text-sm text-gray-700">
                                  100 - 500 ر.س
                                </label>
                              </div>
                              <div className="flex items-center">
                                <Checkbox 
                                  id="m-price-3" 
                                  checked={priceRange.includes("500-1000")} 
                                  onCheckedChange={() => togglePriceRange("500-1000")}
                                />
                                <label htmlFor="m-price-3" className="mr-2 text-sm text-gray-700">
                                  500 - 1000 ر.س
                                </label>
                              </div>
                              <div className="flex items-center">
                                <Checkbox 
                                  id="m-price-4" 
                                  checked={priceRange.includes("1000+")} 
                                  onCheckedChange={() => togglePriceRange("1000+")}
                                />
                                <label htmlFor="m-price-4" className="mr-2 text-sm text-gray-700">
                                  أكثر من 1000 ر.س
                                </label>
                              </div>
                            </div>
                          </div>
                          
                          <div className="mb-6">
                            <h4 className="font-medium mb-3">التقييم</h4>
                            <div className="space-y-2">
                              {[5, 4, 3, 2, 1].map((rating) => (
                                <div key={rating} className="flex items-center">
                                  <Checkbox 
                                    id={`m-rating-${rating}`}
                                    checked={ratings.includes(rating)}
                                    onCheckedChange={() => toggleRating(rating)}
                                  />
                                  <label htmlFor={`m-rating-${rating}`} className="mr-2 text-sm text-gray-700 flex items-center">
                                    {Array(5)
                                      .fill(0)
                                      .map((_, i) => (
                                        <span key={i} className={`text-${i < rating ? "bloom-gold" : "gray-300"}`}>★</span>
                                      ))}
                                    {rating === 5 && <span className="mr-1">فما فوق</span>}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div className="mb-6">
                            <h4 className="font-medium mb-3">التوفر</h4>
                            <div className="space-y-2">
                              <div className="flex items-center">
                                <Checkbox 
                                  id="m-in-stock" 
                                  checked={availability.includes("in-stock")}
                                  onCheckedChange={() => toggleAvailability("in-stock")}
                                />
                                <label htmlFor="m-in-stock" className="mr-2 text-sm text-gray-700">
                                  متوفر
                                </label>
                              </div>
                              <div className="flex items-center">
                                <Checkbox 
                                  id="m-out-of-stock" 
                                  checked={availability.includes("out-of-stock")}
                                  onCheckedChange={() => toggleAvailability("out-of-stock")}
                                />
                                <label htmlFor="m-out-of-stock" className="mr-2 text-sm text-gray-700">
                                  غير متوفر
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <DrawerFooter>
                          <Button
                            variant="outline"
                            onClick={clearFilters}
                            className="w-full text-gray-600"
                          >
                            مسح الفلاتر
                          </Button>
                        </DrawerFooter>
                      </div>
                    </DrawerContent>
                  </Drawer>
                  
                  {/* Sort dropdown */}
                  <div className="flex items-center">
                    <span className="text-sm text-gray-500 ml-2">ترتيب حسب:</span>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="الأكثر شعبية" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="popular">الأكثر شعبية</SelectItem>
                        <SelectItem value="price-low-high">السعر: من الأقل للأعلى</SelectItem>
                        <SelectItem value="price-high-low">السعر: من الأعلى للأقل</SelectItem>
                        <SelectItem value="newest">الأحدث</SelectItem>
                        <SelectItem value="rating">التقييم</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              {/* Applied filters */}
              {(priceRange.length > 0 || ratings.length > 0 || availability.length > 0) && (
                <div className="flex flex-wrap items-center gap-2 mb-6 bg-gray-50 p-3 rounded-md">
                  <span className="text-sm text-gray-500 ml-2">الفلاتر المطبقة:</span>
                  
                  {priceRange.map((range) => (
                    <div key={range} className="flex items-center bg-white border rounded-full px-3 py-1 text-sm">
                      {range === "0-100" && "أقل من 100 ر.س"}
                      {range === "100-500" && "100 - 500 ر.س"}
                      {range === "500-1000" && "500 - 1000 ر.س"}
                      {range === "1000+" && "أكثر من 1000 ر.س"}
                      <button
                        onClick={() => togglePriceRange(range)}
                        className="mr-1 text-gray-500 hover:text-gray-700"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                  
                  {ratings.map((rating) => (
                    <div key={rating} className="flex items-center bg-white border rounded-full px-3 py-1 text-sm">
                      {`${rating} نجوم`}
                      <button
                        onClick={() => toggleRating(rating)}
                        className="mr-1 text-gray-500 hover:text-gray-700"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                  
                  {availability.map((avail) => (
                    <div key={avail} className="flex items-center bg-white border rounded-full px-3 py-1 text-sm">
                      {avail === "in-stock" && "متوفر"}
                      {avail === "out-of-stock" && "غير متوفر"}
                      <button
                        onClick={() => toggleAvailability(avail)}
                        className="mr-1 text-gray-500 hover:text-gray-700"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                  
                  <button
                    onClick={clearFilters}
                    className="text-sm text-bloom-navy hover:underline"
                  >
                    مسح الكل
                  </button>
                </div>
              )}
              
              {/* Products grid */}
              {sortedProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sortedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-white rounded-lg shadow-sm">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">لا توجد منتجات</h2>
                  <p className="text-gray-600 mb-8">لا توجد منتجات تطابق معايير البحث</p>
                  <Button onClick={clearFilters} className="bg-bloom-navy hover:bg-bloom-navy/90">
                    مسح الفلاتر
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Categories;
