
import { Product, CartItem } from "@/types";
import { mockProducts, users } from "@/data/mockData";

// محاكاة تأخير الشبكة
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  // خدمات المنتجات
  products: {
    // جلب كل المنتجات
    getAll: async (): Promise<Product[]> => {
      await delay(800); // محاكاة تأخير الشبكة
      return [...mockProducts];
    },
    
    // جلب منتج معين بالمعرف
    getById: async (id: string): Promise<Product | null> => {
      await delay(600);
      const product = mockProducts.find(p => p.id === id);
      return product ? { ...product } : null;
    },
    
    // جلب المنتجات حسب الفئة
    getByCategory: async (category: string): Promise<Product[]> => {
      await delay(800);
      return mockProducts.filter(p => p.category === category);
    },
    
    // البحث عن منتجات
    search: async (query: string): Promise<Product[]> => {
      await delay(1000);
      const searchTerm = query.toLowerCase();
      return mockProducts.filter(p => 
        p.name.toLowerCase().includes(searchTerm) || 
        p.description.toLowerCase().includes(searchTerm)
      );
    },
    
    // جلب المنتجات المميزة
    getFeatured: async (): Promise<Product[]> => {
      await delay(600);
      return mockProducts.slice(0, 4);
    }
  },
  
  // خدمات المستخدم
  auth: {
    // تسجيل الدخول
    login: async (email: string, password: string): Promise<{
      success: boolean;
      message: string;
      userData?: { id: string; email: string; firstName: string; lastName: string };
    }> => {
      await delay(1000);
      
      const user = users.find(u => u.email === email);
      
      if (!user) {
        return {
          success: false,
          message: "البريد الإلكتروني غير مسجل"
        };
      }
      
      if (user.password !== password) {
        return {
          success: false,
          message: "كلمة المرور غير صحيحة"
        };
      }
      
      return {
        success: true,
        message: "تم تسجيل الدخول بنجاح",
        userData: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName
        }
      };
    },
    
    // تسجيل مستخدم جديد
    register: async (userData: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
    }): Promise<{
      success: boolean;
      message: string;
      userData?: { id: string; email: string; firstName: string; lastName: string };
    }> => {
      await delay(1500);
      
      // التحقق من وجود البريد الإلكتروني مسبقًا
      const existingUser = users.find(u => u.email === userData.email);
      
      if (existingUser) {
        return {
          success: false,
          message: "البريد الإلكتروني مسجل مسبقًا"
        };
      }
      
      // إنشاء معرف جديد (في التطبيق الحقيقي سيتم من قبل قاعدة البيانات)
      const newId = String(users.length + 1);
      
      // إضافة المستخدم الجديد (محاكاة فقط)
      const newUser = {
        id: newId,
        email: userData.email,
        password: userData.password,
        firstName: userData.firstName,
        lastName: userData.lastName
      };
      
      users.push(newUser);
      
      return {
        success: true,
        message: "تم إنشاء الحساب بنجاح",
        userData: {
          id: newUser.id,
          email: newUser.email,
          firstName: newUser.firstName,
          lastName: newUser.lastName
        }
      };
    }
  },
  
  // خدمات الطلب
  orders: {
    // إرسال طلب جديد
    create: async (orderData: {
      cartItems: CartItem[];
      totalAmount: number;
      shippingAddress: {
        name: string;
        street: string;
        city: string;
        zipCode: string;
        phone: string;
      };
      paymentMethod: string;
    }): Promise<{
      success: boolean;
      message: string;
      orderId?: string;
    }> => {
      await delay(2000); // محاكاة عملية الدفع والمعالجة
      
      // التحقق من توفر المنتجات (محاكاة بسيطة)
      for (const item of orderData.cartItems) {
        const product = await api.products.getById(item.id);
        if (!product || product.stock < item.quantity) {
          return {
            success: false,
            message: `المنتج ${item.name} غير متوفر بالكمية المطلوبة`
          };
        }
      }
      
      // إنشاء معرف للطلب
      const orderId = 'ORD-' + Date.now().toString().slice(-8);
      
      return {
        success: true,
        message: "تم إنشاء الطلب بنجاح",
        orderId
      };
    }
  }
};
