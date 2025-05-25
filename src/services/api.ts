
import { Book, CartItem, User, Order, Review, Category, AuthResponse, LoginRequest, RegisterRequest, ApiResponse, PaginatedResponse, SearchFilters, PaginationParams } from "@/types";

// محاكاة تأخير الشبكة
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// الرابط الأساسي للـ API (يمكن تغييره حسب البيئة)
const API_BASE_URL = process.env.VITE_API_URL || 'https://api.bookstore.com';

export const api = {
  // ========== خدمات التوثيق ==========
  auth: {
    // تسجيل الدخول
    login: async (credentials: LoginRequest): Promise<AuthResponse> => {
      await delay(1000);
      
      // محاكاة استجابة نجح تسجيل الدخول
      if (credentials.email === "test@example.com" && credentials.password === "123456") {
        return {
          success: true,
          message: "تم تسجيل الدخول بنجاح",
          data: {
            user: {
              id: "1",
              firstName: "أحمد",
              lastName: "محمد",
              email: "test@example.com",
              phone: "01234567890",
              governorate: "القاهرة",
              city: "مدينة نصر",
              address: "شارع مصطفى النحاس",
              birthDate: "1990-01-01",
              gender: "male",
              createdAt: "2024-01-01",
              isActive: true
            },
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
          }
        };
      }
      
      return {
        success: false,
        message: "البريد الإلكتروني أو كلمة المرور غير صحيحة"
      };
    },

    // تسجيل حساب جديد
    register: async (userData: RegisterRequest): Promise<AuthResponse> => {
      await delay(1500);
      
      return {
        success: true,
        message: "تم إنشاء الحساب بنجاح",
        data: {
          user: {
            id: Date.now().toString(),
            ...userData,
            createdAt: new Date().toISOString(),
            isActive: true
          },
          token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
        }
      };
    },

    // تسجيل الخروج
    logout: async (): Promise<ApiResponse<null>> => {
      await delay(500);
      return {
        success: true,
        message: "تم تسجيل الخروج بنجاح"
      };
    },

    // التحقق من الرمز المميز
    verifyToken: async (token: string): Promise<ApiResponse<User>> => {
      await delay(800);
      return {
        success: true,
        message: "الرمز المميز صالح",
        data: {
          id: "1",
          firstName: "أحمد",
          lastName: "محمد",
          email: "test@example.com",
          phone: "01234567890",
          governorate: "القاهرة",
          city: "مدينة نصر",
          address: "شارع مصطفى النحاس",
          birthDate: "1990-01-01",
          gender: "male",
          createdAt: "2024-01-01",
          isActive: true
        }
      };
    }
  },

  // ========== خدمات الكتب ==========
  books: {
    // جلب جميع الكتب مع الفلترة والصفحات
    getAll: async (filters?: SearchFilters, pagination?: PaginationParams): Promise<PaginatedResponse<Book>> => {
      await delay(1000);
      
      const mockBooks: Book[] = [
        {
          id: "1",
          title: "الأسود يليق بك",
          author: "أحلام مستغانمي",
          price: 80,
          discount: true,
          discountPrice: 65,
          category: "روايات عربية",
          image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400",
          rating: 4.5,
          description: "رواية رومانسية رائعة من أحلام مستغانمي",
          isbn: "978-977-14-1234-5",
          publisher: "دار الشروق",
          publicationDate: "2023-01-15",
          language: "العربية",
          pageCount: 320,
          format: "pdf",
          fileSize: "2.5 MB",
          inStock: true
        },
        {
          id: "2",
          title: "مئة عام من العزلة",
          author: "غابرييل غارسيا ماركيز",
          price: 120,
          discount: false,
          discountPrice: 120,
          category: "روايات عالمية",
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
          rating: 4.8,
          description: "تحفة الأدب العالمي المترجمة للعربية",
          isbn: "978-977-14-5678-9",
          publisher: "المركز الثقافي العربي",
          publicationDate: "2023-02-20",
          language: "العربية",
          pageCount: 450,
          format: "epub",
          fileSize: "3.2 MB",
          inStock: true
        }
      ];

      return {
        success: true,
        message: "تم جلب الكتب بنجاح",
        data: mockBooks,
        pagination: {
          currentPage: pagination?.page || 1,
          totalPages: 5,
          totalItems: 50,
          itemsPerPage: pagination?.limit || 10
        }
      };
    },

    // جلب كتاب محدد
    getById: async (id: string): Promise<ApiResponse<Book>> => {
      await delay(600);
      
      const book: Book = {
        id,
        title: "الأسود يليق بك",
        author: "أحلام مستغانمي",
        price: 80,
        discount: true,
        discountPrice: 65,
        category: "روايات عربية",
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400",
        rating: 4.5,
        description: "رواية رومانسية رائعة من أحلام مستغانمي تحكي قصة حب معقدة",
        isbn: "978-977-14-1234-5",
        publisher: "دار الشروق",
        publicationDate: "2023-01-15",
        language: "العربية",
        pageCount: 320,
        format: "pdf",
        fileSize: "2.5 MB",
        inStock: true
      };

      return {
        success: true,
        message: "تم جلب بيانات الكتاب بنجاح",
        data: book
      };
    },

    // البحث في الكتب
    search: async (query: string, filters?: SearchFilters): Promise<PaginatedResponse<Book>> => {
      await delay(1200);
      
      return {
        success: true,
        message: "تم البحث بنجاح",
        data: [],
        pagination: {
          currentPage: 1,
          totalPages: 1,
          totalItems: 0,
          itemsPerPage: 10
        }
      };
    },

    // جلب الكتب الأكثر مبيعاً
    getBestSellers: async (): Promise<ApiResponse<Book[]>> => {
      await delay(800);
      return {
        success: true,
        message: "تم جلب الكتب الأكثر مبيعاً",
        data: []
      };
    },

    // جلب الكتب الجديدة
    getNewReleases: async (): Promise<ApiResponse<Book[]>> => {
      await delay(800);
      return {
        success: true,
        message: "تم جلب الكتب الجديدة",
        data: []
      };
    }
  },

  // ========== خدمات الفئات ==========
  categories: {
    getAll: async (): Promise<ApiResponse<Category[]>> => {
      await delay(600);
      
      const categories: Category[] = [
        {
          id: "1",
          name: "روايات عربية",
          description: "أجمل الروايات العربية الحديثة والكلاسيكية",
          image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400",
          booksCount: 150
        },
        {
          id: "2",
          name: "كتب دينية",
          description: "كتب التفسير والفقه والسيرة النبوية",
          image: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=400",
          booksCount: 200
        },
        {
          id: "3",
          name: "كتب علمية",
          description: "كتب الفيزياء والكيمياء والرياضيات",
          image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400",
          booksCount: 100
        }
      ];

      return {
        success: true,
        message: "تم جلب الفئات بنجاح",
        data: categories
      };
    }
  },

  // ========== خدمات الطلبات ==========
  orders: {
    // إنشاء طلب جديد
    create: async (orderData: {
      items: CartItem[];
      shippingAddress: {
        governorate: string;
        city: string;
        address: string;
        phone: string;
      };
      paymentMethod: string;
      notes?: string;
    }): Promise<ApiResponse<Order>> => {
      await delay(2000);
      
      const order: Order = {
        id: `ORD-${Date.now()}`,
        userId: "1",
        orderDate: new Date().toISOString(),
        status: "pending",
        totalAmount: orderData.items.reduce((total, item) => 
          total + (item.discount ? item.discountPrice : item.price) * item.quantity, 0
        ),
        items: orderData.items,
        shippingAddress: orderData.shippingAddress,
        paymentMethod: orderData.paymentMethod as any,
        paymentStatus: "pending",
        notes: orderData.notes
      };

      return {
        success: true,
        message: "تم إنشاء الطلب بنجاح",
        data: order
      };
    },

    // جلب طلبات المستخدم
    getUserOrders: async (userId: string): Promise<ApiResponse<Order[]>> => {
      await delay(1000);
      return {
        success: true,
        message: "تم جلب الطلبات بنجاح",
        data: []
      };
    },

    // جلب تفاصيل طلب محدد
    getById: async (orderId: string): Promise<ApiResponse<Order>> => {
      await delay(800);
      
      const order: Order = {
        id: orderId,
        userId: "1",
        orderDate: "2024-01-15T10:30:00Z",
        status: "delivered",
        totalAmount: 145,
        items: [],
        shippingAddress: {
          governorate: "القاهرة",
          city: "مدينة نصر",
          address: "شارع مصطفى النحاس",
          phone: "01234567890"
        },
        paymentMethod: "card",
        paymentStatus: "paid"
      };

      return {
        success: true,
        message: "تم جلب تفاصيل الطلب",
        data: order
      };
    }
  },

  // ========== خدمات المراجعات ==========
  reviews: {
    // جلب مراجعات كتاب
    getBookReviews: async (bookId: string): Promise<ApiResponse<Review[]>> => {
      await delay(800);
      return {
        success: true,
        message: "تم جلب المراجعات بنجاح",
        data: []
      };
    },

    // إضافة مراجعة جديدة
    create: async (reviewData: {
      bookId: string;
      rating: number;
      comment: string;
    }): Promise<ApiResponse<Review>> => {
      await delay(1000);
      
      const review: Review = {
        id: Date.now().toString(),
        userId: "1",
        bookId: reviewData.bookId,
        rating: reviewData.rating,
        comment: reviewData.comment,
        reviewDate: new Date().toISOString(),
        userName: "أحمد محمد"
      };

      return {
        success: true,
        message: "تم إضافة المراجعة بنجاح",
        data: review
      };
    }
  },

  // ========== خدمات الملف الشخصي ==========
  profile: {
    // تحديث البيانات الشخصية
    update: async (userData: Partial<User>): Promise<ApiResponse<User>> => {
      await delay(1000);
      return {
        success: true,
        message: "تم تحديث البيانات بنجاح",
        data: userData as User
      };
    },

    // تغيير كلمة المرور
    changePassword: async (currentPassword: string, newPassword: string): Promise<ApiResponse<null>> => {
      await delay(1000);
      return {
        success: true,
        message: "تم تغيير كلمة المرور بنجاح"
      };
    }
  }
};
