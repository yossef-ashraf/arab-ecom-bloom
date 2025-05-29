import { createContext, useState, useContext, ReactNode } from "react";
import { Book, CartItem, Coupon, CouponValidationResponse } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/services/api";

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (book: Book, quantity?: number) => void;
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
});

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [coupon, setCoupon] = useState<Coupon | null>(null);
  const [discount, setDiscount] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);
  const { toast } = useToast();

  const addToCart = (book: Book, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === book.id);

      if (existingItem) {
        toast({
          title: "تم تحديث السلة",
          description: `تم تحديث كمية "${book.title}" في سلة التسوق`,
        });

        return prevItems.map((item) =>
          item.id === book.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      toast({
        title: "تمت الإضافة إلى السلة",
        description: `تمت إضافة "${book.title}" إلى سلة التسوق`,
      });

      return [...prevItems, { ...book, quantity }];
    });
  };

  const removeFromCart = (bookId: string) => {
    setCartItems((prevItems) => {
      const itemToRemove = prevItems.find((item) => item.id === bookId);
      
      if (itemToRemove) {
        toast({
          title: "تمت إزالة الكتاب",
          description: `تمت إزالة "${itemToRemove.title}" من سلة التسوق`,
        });
      }
      
      return prevItems.filter((item) => item.id !== bookId);
    });
  };

  const updateQuantity = (bookId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(bookId);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === bookId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    
    setCoupon(null);
    setDiscount(0);
    setFinalAmount(0);
    setCartItems([]);
    toast({
      title: "تم تفريغ السلة",
      description: "تم تفريغ سلة التسوق بنجاح",
    });
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const itemPrice = item.discount ? item.discountPrice : item.price;
      return total + itemPrice * item.quantity;
    }, 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const applyCoupon = async (code: string) => {
    try {
      const subtotal = getCartTotal();
      const response = await api.coupons.validate(code, subtotal);
      
      if (response.status === "Success") {
        setCoupon(response.data.coupon);
        setDiscount(response.data.discount);
        setFinalAmount(response.data.final_amount);
        
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
    setFinalAmount(0);
    
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
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
