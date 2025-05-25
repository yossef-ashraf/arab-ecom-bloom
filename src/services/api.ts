
import { 
  Book, 
  User, 
  Order, 
  Category, 
  LoginRequest, 
  RegisterRequest, 
  AuthResponse, 
  ApiResponse, 
  SearchFilters, 
  PaginationParams, 
  PaginatedResponse,
  Coupon,
  Area,
  Address
} from '@/types';

const BASE_URL = 'http://localhost:3000/api';

// Mock data for development (will be replaced with real API calls)
const mockBooks: Book[] = [
  {
    id: "1",
    title: "الأسود يليق بك",
    author: "أحلام مستغانمي",
    price: 120,
    discount: true,
    discountPrice: 95,
    category: "روايات عربية",
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=1000",
    rating: 4.5,
    description: "رواية عربية رائعة تحكي قصة الحب والحياة",
    isbn: "978-9777719636",
    publisher: "دار الآداب",
    publicationDate: "2010-01-01",
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
    price: 150,
    discount: false,
    discountPrice: 150,
    category: "روايات عالمية",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=1000",
    rating: 4.8,
    description: "رواية عالمية كلاسيكية من أدب أمريكا اللاتينية",
    isbn: "978-9770926543",
    publisher: "دار المعارف",
    publicationDate: "2015-03-15",
    language: "العربية",
    pageCount: 450,
    format: "epub",
    fileSize: "3.2 MB",
    inStock: true
  }
];

const mockCategories: Category[] = [
  {
    id: "1",
    name: "روايات عربية",
    description: "روايات من الأدب العربي الحديث",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=1000",
    booksCount: 150
  },
  {
    id: "2", 
    name: "كتب دينية",
    description: "كتب في العلوم الشرعية والدراسات الإسلامية",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000",
    booksCount: 200
  }
];

// API helper functions
const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export const api = {
  // Authentication endpoints
  auth: {
    login: async (credentials: LoginRequest): Promise<AuthResponse> => {
      try {
        return await apiRequest('/auth/login', {
          method: 'POST',
          body: JSON.stringify(credentials),
        });
      } catch (error) {
        // Mock response for development
        return {
          success: true,
          message: "تم تسجيل الدخول بنجاح",
          data: {
            user: {
              id: "1",
              firstName: "أحمد",
              lastName: "محمد",
              email: credentials.email,
              phone: "01012345678",
              governorate: "القاهرة",
              city: "المعادي",
              address: "شارع 9",
              birthDate: "1990-01-01",
              gender: "male",
              createdAt: new Date().toISOString(),
              isActive: true
            },
            token: "mock-jwt-token"
          }
        };
      }
    },

    register: async (userData: RegisterRequest): Promise<AuthResponse> => {
      try {
        return await apiRequest('/auth/register', {
          method: 'POST',
          body: JSON.stringify(userData),
        });
      } catch (error) {
        // Mock response for development
        return {
          success: true,
          message: "تم إنشاء الحساب بنجاح",
          data: {
            user: {
              id: "1",
              firstName: userData.firstName,
              lastName: userData.lastName,
              email: userData.email,
              phone: userData.phone,
              governorate: userData.governorate,
              city: userData.city,
              address: userData.address,
              birthDate: userData.birthDate,
              gender: userData.gender,
              createdAt: new Date().toISOString(),
              isActive: true
            },
            token: "mock-jwt-token"
          }
        };
      }
    },

    logout: async (): Promise<ApiResponse<null>> => {
      try {
        return await apiRequest('/auth/logout', { method: 'POST' });
      } catch (error) {
        return { success: true, message: "تم تسجيل الخروج بنجاح" };
      }
    },

    verifyToken: async (token: string): Promise<ApiResponse<User>> => {
      try {
        return await apiRequest('/auth/verify', {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (error) {
        throw new Error('Token verification failed');
      }
    },
  },

  // Books endpoints
  books: {
    getAll: async (filters?: SearchFilters, pagination?: PaginationParams): Promise<PaginatedResponse<Book>> => {
      try {
        const queryParams = new URLSearchParams();
        if (filters) {
          Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined) queryParams.append(key, value.toString());
          });
        }
        if (pagination) {
          queryParams.append('page', pagination.page.toString());
          queryParams.append('limit', pagination.limit.toString());
        }

        return await apiRequest(`/books?${queryParams}`);
      } catch (error) {
        // Mock response for development
        return {
          success: true,
          message: "تم جلب الكتب بنجاح",
          data: mockBooks,
          pagination: {
            currentPage: 1,
            totalPages: 1,
            totalItems: mockBooks.length,
            itemsPerPage: 20
          }
        };
      }
    },

    getFeatured: async (): Promise<Book[]> => {
      try {
        const response = await apiRequest('/books/featured');
        return response.data || response;
      } catch (error) {
        // Mock response for development
        return mockBooks;
      }
    },

    getById: async (id: string): Promise<Book> => {
      try {
        const response = await apiRequest(`/books/${id}`);
        return response.data || response;
      } catch (error) {
        // Mock response for development
        const book = mockBooks.find(b => b.id === id);
        if (!book) throw new Error('Book not found');
        return book;
      }
    },

    getByCategory: async (category: string, pagination?: PaginationParams): Promise<PaginatedResponse<Book>> => {
      try {
        const queryParams = new URLSearchParams({ category });
        if (pagination) {
          queryParams.append('page', pagination.page.toString());
          queryParams.append('limit', pagination.limit.toString());
        }

        return await apiRequest(`/books/category?${queryParams}`);
      } catch (error) {
        // Mock response for development
        const categoryBooks = mockBooks.filter(book => book.category === category);
        return {
          success: true,
          message: "تم جلب كتب الفئة بنجاح",
          data: categoryBooks,
          pagination: {
            currentPage: 1,
            totalPages: 1,
            totalItems: categoryBooks.length,
            itemsPerPage: 20
          }
        };
      }
    },

    search: async (query: string, filters?: SearchFilters, pagination?: PaginationParams): Promise<PaginatedResponse<Book>> => {
      try {
        const queryParams = new URLSearchParams({ q: query });
        if (filters) {
          Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined) queryParams.append(key, value.toString());
          });
        }
        if (pagination) {
          queryParams.append('page', pagination.page.toString());
          queryParams.append('limit', pagination.limit.toString());
        }

        return await apiRequest(`/books/search?${queryParams}`);
      } catch (error) {
        // Mock response for development
        const searchResults = mockBooks.filter(book => 
          book.title.includes(query) || book.author.includes(query)
        );
        return {
          success: true,
          message: "تم البحث بنجاح",
          data: searchResults,
          pagination: {
            currentPage: 1,
            totalPages: 1,
            totalItems: searchResults.length,
            itemsPerPage: 20
          }
        };
      }
    },
  },

  // Categories endpoints
  categories: {
    getAll: async (): Promise<Category[]> => {
      try {
        const response = await apiRequest('/categories');
        return response.data || response;
      } catch (error) {
        // Mock response for development
        return mockCategories;
      }
    },

    getById: async (id: string): Promise<Category> => {
      try {
        const response = await apiRequest(`/categories/${id}`);
        return response.data || response;
      } catch (error) {
        // Mock response for development
        const category = mockCategories.find(c => c.id === id);
        if (!category) throw new Error('Category not found');
        return category;
      }
    },
  },

  // Orders endpoints
  orders: {
    create: async (orderData: Omit<Order, 'id' | 'orderDate' | 'status'>): Promise<ApiResponse<Order>> => {
      try {
        return await apiRequest('/orders', {
          method: 'POST',
          body: JSON.stringify(orderData),
        });
      } catch (error) {
        // Mock response for development
        return {
          success: true,
          message: "تم إنشاء الطلب بنجاح",
          data: {
            id: Date.now().toString(),
            orderDate: new Date().toISOString(),
            status: 'pending',
            ...orderData
          } as Order
        };
      }
    },

    getByUserId: async (userId: string): Promise<Order[]> => {
      try {
        const response = await apiRequest(`/orders/user/${userId}`);
        return response.data || response;
      } catch (error) {
        // Mock response for development
        return [];
      }
    },

    getById: async (id: string): Promise<Order> => {
      try {
        const response = await apiRequest(`/orders/${id}`);
        return response.data || response;
      } catch (error) {
        throw new Error('Order not found');
      }
    },

    updateStatus: async (id: string, status: Order['status']): Promise<ApiResponse<Order>> => {
      try {
        return await apiRequest(`/orders/${id}/status`, {
          method: 'PATCH',
          body: JSON.stringify({ status }),
        });
      } catch (error) {
        throw new Error('Failed to update order status');
      }
    },
  },

  // User profile endpoints
  profile: {
    update: async (userId: string, userData: Partial<User>): Promise<ApiResponse<User>> => {
      try {
        return await apiRequest(`/profile/${userId}`, {
          method: 'PUT',
          body: JSON.stringify(userData),
        });
      } catch (error) {
        throw new Error('Failed to update profile');
      }
    },

    changePassword: async (userId: string, passwords: { currentPassword: string; newPassword: string }): Promise<ApiResponse<null>> => {
      try {
        return await apiRequest(`/profile/${userId}/password`, {
          method: 'PUT',
          body: JSON.stringify(passwords),
        });
      } catch (error) {
        throw new Error('Failed to change password');
      }
    },
  },

  // Coupons endpoints
  coupons: {
    validate: async (code: string): Promise<ApiResponse<Coupon>> => {
      try {
        return await apiRequest(`/coupons/validate/${code}`);
      } catch (error) {
        throw new Error('Invalid coupon code');
      }
    },

    getAll: async (): Promise<Coupon[]> => {
      try {
        const response = await apiRequest('/coupons');
        return response.data || response;
      } catch (error) {
        return [];
      }
    },
  },

  // Areas endpoints
  areas: {
    getAll: async (): Promise<Area[]> => {
      try {
        const response = await apiRequest('/areas');
        return response.data || response;
      } catch (error) {
        return [];
      }
    },

    getByGovernorate: async (governorate: string): Promise<Area[]> => {
      try {
        const response = await apiRequest(`/areas/governorate/${governorate}`);
        return response.data || response;
      } catch (error) {
        return [];
      }
    },
  },

  // Addresses endpoints
  addresses: {
    getByUserId: async (userId: string): Promise<Address[]> => {
      try {
        const response = await apiRequest(`/addresses/user/${userId}`);
        return response.data || response;
      } catch (error) {
        return [];
      }
    },

    create: async (addressData: Omit<Address, 'id'>): Promise<ApiResponse<Address>> => {
      try {
        return await apiRequest('/addresses', {
          method: 'POST',
          body: JSON.stringify(addressData),
        });
      } catch (error) {
        throw new Error('Failed to create address');
      }
    },

    update: async (id: string, addressData: Partial<Address>): Promise<ApiResponse<Address>> => {
      try {
        return await apiRequest(`/addresses/${id}`, {
          method: 'PUT',
          body: JSON.stringify(addressData),
        });
      } catch (error) {
        throw new Error('Failed to update address');
      }
    },

    delete: async (id: string): Promise<ApiResponse<null>> => {
      try {
        return await apiRequest(`/addresses/${id}`, {
          method: 'DELETE',
        });
      } catch (error) {
        throw new Error('Failed to delete address');
      }
    },
  },
};
