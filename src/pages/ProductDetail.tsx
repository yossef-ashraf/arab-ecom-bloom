import { useState, useNavigate } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  Star, 
  Truck, 
  Shield, 
  ArrowLeft, 
  Minus, 
  Plus, 
  Heart 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useCart, useToast } from "@/contexts/CartContext";

// Sample product data
const productData = {
  id: "1",
  name: "هاتف ذكي برو ماكس",
  price: 4999,
  discount: true,
  discountPrice: 4499,
  category: "إلكترونيات",
  image: "https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHNtYXJ0cGhvbmV8ZW58MHx8MHx8fDA%3D",
  images: [
    "https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHNtYXJ0cGhvbmV8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fHNtYXJ0cGhvbmV8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTR8fHNtYXJ0cGhvbmV8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1557180295-76eee20ae8aa?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTJ8fHNtYXJ0cGhvbmV8ZW58MHx8MHx8fDA%3D",
  ],
  rating: 4.8,
  reviewCount: 127,
  description: "أحدث إصدار من الهواتف الذكية بميزات فائقة ومواصفات عالية. شاشة كبيرة بدقة عالية، معالج سريع، وكاميرا احترافية لالتقاط صور وفيديوهات رائعة. تصميم أنيق مع بطارية تدوم طويلاً.",
  stock: 15,
  specifications: [
    { name: "الشاشة", value: "6.7 بوصة سوبر أموليد" },
    { name: "المعالج", value: "أوكتا كور 2.5 جيجاهرتز" },
    { name: "الذاكرة", value: "8 جيجابايت رام" },
    { name: "التخزين", value: "256 جيجابايت" },
    { name: "الكاميرا الخلفية", value: "48 ميجابكسل + 12 ميجابكسل + 12 ميجابكسل" },
    { name: "الكاميرا الأمامية", value: "12 ميجابكسل" },
    { name: "البطارية", value: "4500 مللي أمبير" },
    { name: "نظام التشغيل", value: "أندرويد 13" },
  ],
};

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toast } = useToast();

  // In a real app, you would fetch the product by id
  const product = productData;
  
  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      setQuantity(1);
    }
  };
  
  const handleBuyNow = () => {
    if (product) {
      addToCart(product, quantity);
      navigate("/cart");
    }
  };
  
  const discountPercentage = product.discount
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 space-x-reverse">
              <li>
                <Link to="/" className="text-gray-500 hover:text-gray-700">الرئيسية</Link>
              </li>
              <li>/</li>
              <li>
                <Link to={`/categories/${product.category}`} className="text-gray-500 hover:text-gray-700">
                  {product.category}
                </Link>
              </li>
              <li>/</li>
              <li className="text-gray-900">{product.name}</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product images */}
            <div>
              <div className="mb-4 aspect-square overflow-hidden rounded-lg bg-gray-100">
                <img 
                  src={product.images[activeImage]} 
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              </div>
              
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    className={`aspect-square overflow-hidden rounded-md border-2 ${
                      activeImage === index ? "border-bloom-gold" : "border-transparent"
                    }`}
                    onClick={() => setActiveImage(index)}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} - صورة ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
            
            {/* Product info */}
            <div>
              <h1 className="text-3xl font-bold text-bloom-navy mb-2">{product.name}</h1>
              
              <div className="flex items-center mb-4">
                <div className="flex ml-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? "text-bloom-gold fill-bloom-gold"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500">
                  ({product.reviewCount} تقييم)
                </span>
              </div>
              
              <div className="mb-6">
                {product.discount ? (
                  <div className="flex items-center">
                    <span className="text-3xl font-bold text-bloom-coral ml-3">
                      {product.discountPrice} ر.س
                    </span>
                    <span className="text-xl text-gray-500 line-through ml-3">
                      {product.price} ر.س
                    </span>
                    <span className="bg-bloom-coral text-white text-sm font-bold px-2 py-1 rounded">
                      خصم {discountPercentage}%
                    </span>
                  </div>
                ) : (
                  <span className="text-3xl font-bold text-bloom-navy">
                    {product.price} ر.س
                  </span>
                )}
              </div>
              
              <p className="text-gray-700 mb-6">{product.description}</p>
              
              <div className="mb-6">
                <div className="flex items-center mb-3">
                  <span className="text-gray-600 ml-3">الحالة:</span>
                  {product.stock > 0 ? (
                    <span className="text-green-600 font-medium">متوفر ({product.stock})</span>
                  ) : (
                    <span className="text-red-600 font-medium">غير متوفر</span>
                  )}
                </div>
              </div>
              
              <div className="flex items-center mb-6">
                <div className="border border-gray-300 rounded-md flex items-center ml-4">
                  <button
                    onClick={decrementQuantity}
                    className="px-3 py-2 text-gray-600 hover:text-bloom-navy"
                    disabled={quantity <= 1}
                  >
                    <Minus size={16} />
                  </button>
                  <span className="px-3 py-2 text-gray-800 min-w-[40px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={incrementQuantity}
                    className="px-3 py-2 text-gray-600 hover:text-bloom-navy"
                    disabled={quantity >= product.stock}
                  >
                    <Plus size={16} />
                  </button>
                </div>
                
                <Button
                  onClick={handleAddToCart}
                  className="bg-bloom-navy text-white hover:bg-bloom-navy/90 flex-1 font-bold py-6"
                  disabled={product.stock <= 0}
                >
                  إضافة إلى السلة
                </Button>
                
                <Button
                  variant="outline"
                  className="mr-3 p-3 border-gray-300 hover:bg-gray-100 hover:text-bloom-coral"
                  aria-label="أضف إلى المفضلة"
                >
                  <Heart size={20} />
                </Button>
              </div>
              
              <div className="space-y-3 border-t pt-6">
                <div className="flex items-center text-gray-700">
                  <Truck size={20} className="ml-3 text-bloom-gold" />
                  <span>شحن مجاني للطلبات فوق 200 ر.س</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Shield size={20} className="ml-3 text-bloom-gold" />
                  <span>ضمان جودة المنتج</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <ArrowLeft size={20} className="ml-3 text-bloom-gold" />
                  <span>إرجاع مجاني خلال 14 يوم</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Product details tabs */}
          <div className="mt-16">
            <Tabs defaultValue="specifications">
              <TabsList className="mb-6">
                <TabsTrigger value="specifications">المواصفات</TabsTrigger>
                <TabsTrigger value="reviews">التقييمات</TabsTrigger>
                <TabsTrigger value="shipping">الشحن والإرجاع</TabsTrigger>
              </TabsList>
              
              <TabsContent value="specifications" className="p-6 bg-white rounded-md shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.specifications.map((spec, index) => (
                    <div key={index} className="flex border-b border-gray-100 py-3">
                      <span className="font-medium text-gray-600 ml-3 min-w-[120px]">{spec.name}:</span>
                      <span className="text-gray-800">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="reviews" className="p-6 bg-white rounded-md shadow-sm">
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">لا توجد تقييمات بعد</p>
                  <Button>أضف تقييمك</Button>
                </div>
              </TabsContent>
              
              <TabsContent value="shipping" className="p-6 bg-white rounded-md shadow-sm">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-bloom-navy mb-2">سياسة الشحن</h3>
                    <p className="text-gray-700">
                      نقدم شحن مجاني لجميع الطلبات التي تزيد قيمتها عن 200 ر.س. 
                      يستغرق توصيل الطلبات من 3-5 أيام عمل اعتماداً على موقعك.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-bold text-bloom-navy mb-2">سياسة الإرجاع</h3>
                    <p className="text-gray-700">
                      يمكنك إرجاع المنتج خلال 14 يوماً من تاريخ الاستلام إذا كان غير مستخدم وفي عبوته الأصلية.
                      سيتم رد المبلغ بالكامل خلال 7 أيام عمل من استلام المنتج المرتجع.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
