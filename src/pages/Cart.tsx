
import { useState } from "react";
import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useCart } from "@/contexts/CartContext";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const [couponCode, setCouponCode] = useState("");
  
  const isEmpty = cartItems.length === 0;
  const subtotal = getCartTotal();
  const shipping = subtotal > 200 ? 0 : 20;
  const total = subtotal + shipping;
  
  const handleQuantityChange = (productId: string, newQuantity: number) => {
    updateQuantity(productId, newQuantity);
  };
  
  const handleRemoveItem = (productId: string) => {
    removeFromCart(productId);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold text-bloom-navy mb-8">سلة التسوق</h1>
          
          {isEmpty ? (
            <div className="text-center py-16 bg-white rounded-lg shadow-sm">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">سلة التسوق فارغة</h2>
              <p className="text-gray-600 mb-8">لم تقم بإضافة أي منتجات إلى سلة التسوق بعد</p>
              <Button asChild className="bg-bloom-navy hover:bg-bloom-navy/90">
                <Link to="/">العودة للتسوق</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart items */}
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
                    const itemPrice = item.discount ? item.discountPrice : item.price;
                    const itemTotal = itemPrice * item.quantity;
                    
                    return (
                      <div key={item.id} className="p-6 border-b hover:bg-gray-50 transition-colors">
                        <div className="flex items-center">
                          {/* Product image and info */}
                          <div className="flex flex-1">
                            <div className="w-20 h-20 rounded-md overflow-hidden ml-4">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <Link
                                to={`/product/${item.id}`}
                                className="font-medium text-bloom-navy hover:text-bloom-gold transition-colors"
                              >
                                {item.name}
                              </Link>
                              <p className="text-sm text-gray-500">{item.category}</p>
                            </div>
                          </div>
                          
                          {/* Quantity */}
                          <div className="flex items-center ml-4">
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              className="p-1 text-gray-500 hover:text-bloom-navy"
                              disabled={item.quantity <= 1}
                            >
                              <Minus size={16} />
                            </button>
                            <span className="mx-2 w-8 text-center">{item.quantity}</span>
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              className="p-1 text-gray-500 hover:text-bloom-navy"
                              disabled={item.quantity >= item.stock}
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                          
                          {/* Price */}
                          <div className="w-24 text-right ml-4">
                            <p className="font-medium">{itemPrice} ر.س</p>
                            {item.discount && (
                              <p className="text-sm text-gray-500 line-through">{item.price} ر.س</p>
                            )}
                          </div>
                          
                          {/* Total */}
                          <div className="w-24 text-right ml-4">
                            <p className="font-medium">{itemTotal} ر.س</p>
                          </div>
                          
                          {/* Remove */}
                          <button
                            onClick={() => handleRemoveItem(item.id)}
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
                      className="text-bloom-navy hover:bg-gray-100"
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
              
              {/* Order summary */}
              <div>
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-bold text-bloom-navy mb-6">ملخص الطلب</h2>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">المجموع الفرعي</span>
                      <span className="font-medium">{subtotal} ر.س</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">الشحن</span>
                      <span className="font-medium">
                        {shipping === 0 ? "مجاني" : `${shipping} ر.س`}
                      </span>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-between text-lg font-bold">
                      <span className="text-bloom-navy">الإجمالي</span>
                      <span className="text-bloom-navy">{total} ر.س</span>
                    </div>
                    
                    {shipping === 0 && (
                      <div className="text-center text-green-600 text-sm py-2 bg-green-50 rounded-md">
                        أنت مؤهل للشحن المجاني!
                      </div>
                    )}
                  </div>
                  
                  {/* Coupon code */}
                  <div className="mb-6">
                    <div className="flex mb-3">
                      <input
                        type="text"
                        placeholder="كود الخصم"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="flex-1 border border-gray-300 rounded-r-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-bloom-gold focus:border-transparent"
                      />
                      <Button
                        className="bg-bloom-gold text-bloom-navy rounded-l-md rounded-r-none hover:bg-bloom-gold/90"
                        disabled={!couponCode}
                      >
                        تطبيق
                      </Button>
                    </div>
                  </div>
                  
                  <Button
                    className="w-full bg-bloom-navy hover:bg-bloom-navy/90 text-lg py-6"
                    asChild
                  >
                    <Link to="/checkout">إتمام الطلب</Link>
                  </Button>
                  
                  <div className="mt-6 text-center text-sm text-gray-500">
                    بالضغط على "إتمام الطلب"، أنت توافق على
                    <Link to="/terms" className="text-bloom-navy hover:underline mx-1">
                      شروط الخدمة
                    </Link>
                    و
                    <Link to="/privacy" className="text-bloom-navy hover:underline mr-1">
                      سياسة الخصوصية
                    </Link>
                  </div>
                </div>
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
