import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { Book, CartItem, Coupon, CouponValidationResponse } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/services/api";

interface CartProduct {
  id: number;
  slug: string;
  author: string;
  description: string | null;
  type: 'simple' | 'variable';
  sku: string;
  price: number;
  image: string;
  sale_price: number;
  stock_status: 'in_stock' | 'out_of_stock';
  stock_qty: number;
  image_url: string;
}

interface CartVariation {
  id: number;
  slug: string;
  product_id: number;
  price: number;
  sale_price: number;
  stock_status: 'in_stock' | 'out_of_stock';
  stock_qty: number;
  sku: string;
}

interface CartItemResponse {
  id: number;
  user_id: number;
  product_id: number;
  variation_id: number | null;
  total: number;
  quantity: number;
  product: CartProduct;
  variation: CartVariation | null;
}

interface CartContextType {
  cartItems: CartItemResponse[];
  addToCart: (book: Book & { variation_id?: number | null }, quantity?: number) => void;
  removeFromCart: (bookId: string) => void;
  updateQuantity: (bookId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
  applyCoupon: (code: string) => Promise<void>;
  removeCoupon: () => void;
  coupon: Coupon | null;
  discount: number;
  finalAmount: number;
  loading: boolean;
  subtotal: number;
  total: number;
}

const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  getCartTotal: () => 0,
  getCartCount: () => 0,
  applyCoupon: async () => {},
  removeCoupon: () => {},
  coupon: null,
  discount: 0,
  finalAmount: 0,
  loading: false,
  subtotal: 0,
  total: 0,
});

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItemResponse[]>([]);
  const [coupon, setCoupon] = useState<Coupon | null>(null);
  const [discount, setDiscount] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const { toast } = useToast();

  // Fetch cart items on mount and when token changes
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchCartItems();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await api.cart.get();

      if (response.status === "Success") {
        const sortedItems = response.data.sort((a: CartItemResponse, b: CartItemResponse) => {
          if (a.variation && !b.variation) return -1;
          if (!a.variation && b.variation) return 1;
          return 0;
        });

        setCartItems(sortedItems);
        
        const newSubtotal = sortedItems.reduce((sum, item) => {
          const price = item.variation ? item.variation.sale_price : item.product.sale_price;
          return sum + (price * item.quantity);
        }, 0);
        
        setSubtotal(Math.round(newSubtotal * 100) / 100);
        setTotal(Math.round(newSubtotal * 100) / 100);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء تحميل السلة",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (book: Book & { variation_id?: number | null }, quantity = 1) => {
    try {
      const response = await api.cart.add({
        product_id: parseInt(book.id),
        variation_id: book.variation_id || null,
        quantity: quantity
      });

      if (response.status === "Success") {
        await fetchCartItems();
        toast({
          title: "تمت الإضافة إلى السلة",
          description: `تمت إضافة "${book.title}" إلى سلة التسوق`,
        });
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء إضافة المنتج إلى السلة",
        variant: "destructive",
      });
    }
  };

  const removeFromCart = async (bookId: string) => {
    try {
      const cartItem = cartItems.find(item => item.product_id.toString() === bookId);
      if (!cartItem) return;

      const response = await api.cart.remove(cartItem.id);
      
      if (response.status === "Success") {
        await fetchCartItems();
        toast({
          title: "تمت إزالة الكتاب",
          description: "تمت إزالة المنتج من سلة التسوق",
        });
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء إزالة المنتج من السلة",
        variant: "destructive",
      });
    }
  };

  const updateQuantity = async (bookId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(bookId);
      return;
    }

    try {
      const cartItem = cartItems.find(item => item.product_id.toString() === bookId);
      if (!cartItem) return;

      const response = await api.cart.update(cartItem.id, {
        quantity: quantity
      });

      if (response.status === "Success") {
        await fetchCartItems();
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء تحديث الكمية",
        variant: "destructive",
      });
    }
  };

  const clearCart = async () => {
    try {
      const response = await api.cart.clear();
      
      if (response.status === "Success") {
        // Only clear cart state after successful API call
        setCartItems([]);
        setCoupon(null);
        setDiscount(0);
        setFinalAmount(0);
        setSubtotal(0);
        setTotal(0);
        toast({
          title: "تم تفريغ السلة",
          description: "تم تفريغ سلة التسوق بنجاح",
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error clearing cart:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء تفريغ السلة",
        variant: "destructive",
      });
      return false;
    }
  };

  const getCartTotal = () => {
    return Math.round(cartItems.reduce((total, item) => {
      const price = item.variation ? item.variation.sale_price : item.product.sale_price;
      return total + (price * item.quantity);
    }, 0) * 100) / 100;
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const applyCoupon = async (code: string) => {
    try {
      const response = await api.coupons.validate(code, subtotal);
      
      if (response.status === "Success") {
        setCoupon(response.data.coupon);
        setDiscount(Math.round(response.data.discount * 100) / 100);
        setFinalAmount(Math.round(response.data.final_amount * 100) / 100);
        
        toast({
          title: "تم تطبيق الكوبون",
          description: `تم تطبيق كوبون الخصم بنجاح`,
        });
      }
    } catch (error) {
      toast({
        title: "خطأ",
        description: "كود الكوبون غير صالح",
        variant: "destructive",
      });
    }
  };

  const removeCoupon = () => {
    setCoupon(null);
    setDiscount(0);
    setFinalAmount(total);
    
    toast({
      title: "تم إزالة الكوبون",
      description: "تم إزالة كوبون الخصم من الطلب",
    });
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
        applyCoupon,
        removeCoupon,
        coupon,
        discount,
        finalAmount,
        loading,
        subtotal,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
