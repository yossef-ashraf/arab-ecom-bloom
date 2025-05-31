import { useState } from "react";
import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ArrowLeft, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useCart } from "@/contexts/CartContext";

const roundNumber = (num: number) => Math.round(num * 100) / 100;

const Cart = () => {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    getCartTotal, 
    clearCart,
    applyCoupon,
    removeCoupon,
    coupon,
    discount,
    finalAmount,
    loading
  } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const isEmpty = cartItems.length === 0;
  const subtotal = roundNumber(getCartTotal());
  const shipping = subtotal > 200 ? 0 : 20;
  const total = roundNumber(coupon ? finalAmount + shipping : subtotal + shipping);
  
  const handleQuantityChange = (productId: string, newQuantity: number) => {
    updateQuantity(productId, newQuantity);
  };
  
  const handleRemoveItem = (productId: string) => {
    removeFromCart(productId);
  };

  const handleApplyCoupon = async () => {
    if (couponCode.trim()) {
      await applyCoupon(couponCode);
      setCouponCode("");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow py-12">
          <div className="container mx-auto">
            <div className="text-center py-16">
              <p>جاري تحميل السلة...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold text-blue-900 mb-8">سلة التسوق</h1>
          
          {isEmpty ? (
            <div className="text-center py-16 bg-white rounded-lg shadow-sm">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">سلة التسوق فارغة</h2>
              <p className="text-gray-600 mb-8">لم تقم بإضافة أي منتجات إلى سلة التسوق بعد</p>
              <Button asChild className="bg-blue-900 hover:bg-blue-800">
                <Link to="/">العودة للتسوق</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="p-6 border-b">
                    <div className="flex justify-between text-sm font-medium text-gray-500">
                      <span>المنتج</span>
                      <div className="flex">
                        <span className="mr-16">الكمية</span>
                        <span className="mr-16">السعر</span>
                        <span className="mr-8">المجموع</span>
                      </div>
                    </div>
                  </div>
                  
                  {cartItems.map((item) => {
                    const price = roundNumber(item.variation ? item.variation.sale_price : item.product.sale_price);
                    const originalPrice = roundNumber(item.variation ? item.variation.price : item.product.price);
                    const hasDiscount = price < originalPrice;
                    const itemTotal = roundNumber(price * item.quantity);
                    
                    return (
                      <div key={item.id} className="p-6 border-b hover:bg-gray-50 transition-colors">
                        <div className="flex items-center">
                          <div className="flex flex-1">
                            <div className="w-20 h-20 rounded-md overflow-hidden ml-4">
                              <img
                                src={item.product.image_url}
                                alt={item.product.slug}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <Link
                                to={`/product/${item.product_id}`}
                                className="font-medium text-blue-900 hover:text-amber-600 transition-colors"
                              >
                                {item.product.slug}
                              </Link>
                              <p className="text-sm text-gray-500">نوع المنتج: {item.product.type}</p>
                              <p className="text-sm text-gray-500">بقلم: {item.product.author}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center ml-8">
                            <button
                              onClick={() => handleQuantityChange(item.product_id.toString(), item.quantity - 1)}
                              className="p-1 text-gray-500 hover:text-blue-900"
                              disabled={item.quantity <= 1}
                            >
                              <Minus size={16} />
                            </button>
                            <span className="mx-2 w-8 text-center">{item.quantity}</span>
                            <button
                              onClick={() => handleQuantityChange(item.product_id.toString(), item.quantity + 1)}
                              className="p-1 text-gray-500 hover:text-blue-900"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                          
                          <div className="w-24 text-right ml-4">
                            <p className="font-medium">{price} جنيه</p>
                            {hasDiscount && (
                              <p className="text-sm text-gray-500 line-through">{originalPrice} جنيه</p>
                            )}
                          </div>
                          
                          <div className="w-24 text-right ml-4">
                            <p className="font-medium">{itemTotal} جنيه</p>
                          </div>
                          
                          <button
                            onClick={() => handleRemoveItem(item.product_id.toString())}
                            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                            aria-label="إزالة المنتج"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                  
                  <div className="p-6 flex justify-between">
                    <Button
                      variant="outline"
                      className="text-blue-900 hover:bg-gray-100"
                      asChild
                    >
                      <Link to="/">
                        <ArrowLeft size={18} className="ml-2" />
                        متابعة التسوق
                      </Link>
                    </Button>
                    
                    <Button
                      variant="outline"
                      className="text-red-600 hover:bg-red-50 hover:border-red-200"
                      onClick={clearCart}
                    >
                      تفريغ السلة
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-blue-900 mb-6">ملخص الطلب</h2>
                
                <div className="mb-6">
                  {coupon ? (
                    <div className="bg-green-50 p-4 rounded-md">
                      <div className="flex justify-between items-center mb-2">
                        <div>
                          <p className="font-medium text-green-800">{coupon.name}</p>
                          <p className="text-sm text-green-600">الخصم: {roundNumber(discount)} جنيه</p>
                        </div>
                        <button
                          onClick={removeCoupon}
                          className="text-green-600 hover:text-green-800"
                        >
                          <X size={18} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex mb-3">
                      <input
                        type="text"
                        placeholder="كود الخصم"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="flex-1 border border-gray-300 rounded-r-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                      />
                      <Button
                        className="bg-amber-600 text-white rounded-l-md rounded-r-none hover:bg-amber-700"
                        disabled={!couponCode}
                        onClick={handleApplyCoupon}
                      >
                        تطبيق
                      </Button>
                    </div>
                  )}
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">المجموع الفرعي</span>
                    <span className="font-medium">{roundNumber(subtotal)} جنيه</span>
                  </div>
                  {coupon && (
                    <div className="flex justify-between text-green-600">
                      <span>الخصم</span>
                      <span className="font-medium">-{roundNumber(discount)} جنيه</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">الشحن</span>
                    <span className="font-medium">
                      {shipping === 0 ? "مجاني" : `${roundNumber(shipping)} جنيه`}
                    </span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between text-lg font-bold">
                    <span className="text-blue-900">الإجمالي</span>
                    <span className="text-blue-900">{roundNumber(total)} جنيه</span>
                  </div>
                  
                  {shipping === 0 && (
                    <div className="text-center text-green-600 text-sm py-2 bg-green-50 rounded-md">
                      أنت مؤهل للشحن المجاني!
                    </div>
                  )}
                </div>
                
                <Button
                  className="w-full bg-blue-900 hover:bg-blue-800 text-lg py-6"
                  asChild
                >
                  <Link to="/checkout">إتمام الطلب</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
