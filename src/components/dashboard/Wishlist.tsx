
import { useState, useEffect } from "react";
import { Loader2, ShoppingCart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { useCart } from "@/contexts/CartContext";
import { Product } from "@/types";
import { api } from "@/services/api";

// بيانات وهمية للمفضلة
const mockWishlist: Product[] = [
  {
    id: "1",
    name: "سماعات لاسلكية فاخرة",
    price: 299.99,
    discount: true,
    discountPrice: 249.99,
    category: "إلكترونيات",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop",
    rating: 4.5,
    description: "سماعات لاسلكية عالية الجودة بتقنية إلغاء الضوضاء",
    stock: 10
  },
  {
    id: "4",
    name: "حقيبة يد فاخرة",
    price: 199.99,
    discount: false,
    discountPrice: 199.99,
    category: "إكسسوارات",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1000&auto=format&fit=crop",
    rating: 4.8,
    description: "حقيبة يد فاخرة مصنوعة من الجلد الطبيعي 100%",
    stock: 5
  }
];

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useCart();
  const { toast } = useToast();

  // محاكاة جلب قائمة المفضلة من الخادم
  useEffect(() => {
    const fetchWishlist = async () => {
      // محاكاة تأخير الشبكة
      await new Promise(resolve => setTimeout(resolve, 1000));
      setWishlistItems(mockWishlist);
      setIsLoading(false);
    };

    fetchWishlist();
  }, []);

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
    toast({
      title: "تمت الإضافة إلى السلة",
      description: `تمت إضافة ${product.name} إلى سلة التسوق`
    });
  };

  const handleRemoveFromWishlist = (productId: string) => {
    setWishlistItems(prev => prev.filter(item => item.id !== productId));
    toast({
      title: "تمت الإزالة",
      description: "تم حذف المنتج من قائمة المفضلة"
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-bloom-navy mb-6">قائمة المفضلة</h2>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-8 h-8 text-bloom-navy animate-spin" />
        </div>
      ) : wishlistItems.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-medium text-gray-600 mb-4">قائمة المفضلة فارغة</h3>
          <p className="text-gray-500 mb-6">لم تقم بإضافة أي منتجات إلى المفضلة حتى الآن</p>
          <Button asChild className="bg-bloom-navy">
            <a href="/">تصفح المنتجات</a>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {wishlistItems.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  <div className="w-full md:w-40 h-40 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 p-4 flex flex-col md:flex-row md:items-center">
                    <div className="flex-1">
                      <h3 className="font-medium text-lg text-bloom-navy">{product.name}</h3>
                      <p className="text-gray-500 mb-2">{product.category}</p>
                      
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="font-bold text-xl">
                          {product.discount ? product.discountPrice : product.price} ر.س
                        </span>
                        {product.discount && (
                          <span className="text-gray-500 line-through text-sm">
                            {product.price} ر.س
                          </span>
                        )}
                      </div>
                      
                      <div className="text-sm">
                        <span className={product.stock > 0 ? "text-green-600" : "text-red-600"}>
                          {product.stock > 0 ? "متوفر" : "غير متوفر"}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex mt-4 md:mt-0 space-x-2 space-x-reverse">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                        onClick={() => handleRemoveFromWishlist(product.id)}
                      >
                        <Trash2 className="ml-1 w-4 h-4" />
                        حذف
                      </Button>
                      
                      <Button
                        size="sm"
                        className="bg-bloom-navy"
                        onClick={() => handleAddToCart(product)}
                        disabled={product.stock <= 0}
                      >
                        <ShoppingCart className="ml-1 w-4 h-4" />
                        أضف للسلة
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
