import { 
  Book, 
  Order, 
  Category, 
  LoginRequest, 
  RegisterRequest, 
  ApiResponse, 
  SearchFilters, 
  PaginationParams, 
  PaginatedResponse,
  Coupon,
  CouponValidationResponse,
  Area,
  Address,
  AuthResponse,
  User
} from '@/types';
import Cookies from 'js-cookie';

const BASE_URL = 'http://localhost:8000/api';

// Mock data for development (will be replaced with real API calls)
// api.ts
export const getProducts = async () => {
  const res = await fetch('http://127.0.0.1:8000/api/products/');
  if (!res.ok) throw new Error('Failed to fetch products');
  const json = await res.json();
  return json.data; // because the API returns { status, message, data }
};

export const getOrders = async () => {
  const token = Cookies.get('access_token');
  const res = await fetch('http://127.0.0.1:8000/api/orders/', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error('Failed to fetch products');
  const json = await res.json();
  console.log("Fetched orders:", json.data);
  return json; // because the API returns { status, message, data }
};

export const getProductsByCategory = async (categoryId: number) => {
  const res = await fetch(`http://127.0.0.1:8000/api/categories/${categoryId}`);
  if (!res.ok) throw new Error('Failed to fetch category data');
  const json = await res.json();
  return {
    categoryName: json.data.data,         // This is the category name
    products: json.data.products || []    // These are the products
  };
};

export const getProductsById = async (productId: number) => {
  const res = await fetch(`http://127.0.0.1:8000/api/products/${productId}`);
  if (!res.ok) throw new Error(`Failed to fetch products ${productId}`);
  const json = await res.json();
  console.log(json.data)
  return json.data;
};

export const getCategories = async () => {
  const res = await fetch('http://127.0.0.1:8000/api/categories/');
  if (!res.ok) throw new Error('Failed to fetch products');
  const json = await res.json();
  return json.data; // because the API returns { status, message, data }
};

// const mockBooks: any= getProducts();
// console.log(mockBooks);

const mockBooks: Book[] = [
  {
    id: "1",
    title: "الأسود يليق بك",
    author: "أحلام مستغانمي",
    price: 120,
    discount: true,
    discountPrice: 95,
    category: "روايات عربية",
    category_id: 1,
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
    category_id: 2,
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
    itemCount: 150,
    booksCount: 150
  },
  {
    id: "2", 
    name: "كتب دينية",
    description: "كتب في العلوم الشرعية والدراسات الإسلامية",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000",
    itemCount: 200,
    booksCount: 200
  }
];

// API helper function
const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const token = Cookies.get('access_token');
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...options.headers,
  };

  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      // Handle authentication errors
      if (response.status === 401) {
        // Clear cookies and redirect to login
        Cookies.remove('access_token');
        Cookies.remove('user');
        window.location.href = '/login';
        throw new Error('انتهت صلاحية الجلسة، يرجى تسجيل الدخول مرة أخرى');
      }

      // Handle validation errors
      if (response.status === 422 && data.errors) {
        const errorMessage = Object.values(data.errors)
          .flat()
          .join('\n');
        throw new Error(errorMessage);
      }
      
      // Handle other errors
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unexpected error occurred');
  }
};

export const api = {
  // Authentication endpoints
  auth: {
    login: async (credentials: LoginRequest): Promise<AuthResponse> => {
      const response = await apiRequest('login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });
      
      if (response.data?.access_token) {
        Cookies.set('access_token', response.data.access_token, { expires: 7 });
        Cookies.set('user', JSON.stringify(response.data.user), { expires: 7 });
      }
      
      return response;
    },

    register: async (userData: RegisterRequest): Promise<AuthResponse> => {
      const response = await apiRequest('register', {
        method: 'POST',
        body: JSON.stringify(userData),
      });
      
      if (response.data?.access_token) {
        Cookies.set('access_token', response.data.access_token, { expires: 7 });
        Cookies.set('user', JSON.stringify(response.data.user), { expires: 7 });
      }
      
      return response;
    },

    logout: async (): Promise<ApiResponse<null>> => {
      try {
        const response = await apiRequest('logout', {
          method: 'POST',
        });
        
        Cookies.remove('access_token');
        Cookies.remove('user');
        
        return response;
      } catch (error) {
        // Even if the API call fails, clear the cookies
        Cookies.remove('access_token');
        Cookies.remove('user');
        throw error;
      }
    },

    getCurrentUser: () => {
      const userStr = Cookies.get('user');
      return userStr ? JSON.parse(userStr) : null;
    },

    isAuthenticated: () => {
      return !!Cookies.get('access_token');
    }
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

        return await apiRequest(`products?${queryParams}`);
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
        const response = await apiRequest('products/featured');
        return response.data || response;
      } catch (error) {
        // Mock response for development
        return mockBooks;
      }
    },

    getById: async (id: string): Promise<Book> => {
      try {
        const response = await apiRequest(`products/${id}`);
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

        return await apiRequest(`products/category?${queryParams}`);
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

        return await apiRequest(`products/search?${queryParams}`);
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
    getAll: async (): Promise<ApiResponse<Order[]>> => {
      try {
        return await apiRequest('orders', {
          method: 'GET',
        });
      } catch (error) {
        throw new Error('فشل في جلب الطلبات');
      }
    },

    cancel: async (orderId: number): Promise<ApiResponse<null>> => {
      try {
        return await apiRequest(`orders/${orderId}/cancel`, {
          method: 'POST',
        });
      } catch (error) {
        throw new Error('فشل في إلغاء الطلب');
      }
    },

    create: async (orderData: Omit<Order, 'id' | 'orderDate' | 'status'>): Promise<ApiResponse<Order>> => {
      try {
        return await apiRequest('/orders', {
          method: 'POST',
          body: JSON.stringify(orderData),
        });
      } catch (error) {
        // Mock response for development
        const mockOrder = {
          id: Date.now(),
          orderDate: new Date().toISOString(),
          status: 'pending',
          ...orderData
        } as unknown as Order;
        
        return {
          status: 'Success',
          message: "تم إنشاء الطلب بنجاح",
          data: mockOrder
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
    getUser: async (): Promise<ApiResponse<User>> => {
      try {
        return await apiRequest('user', {
          method: 'GET',
        });
      } catch (error) {
        throw new Error('فشل في جلب بيانات المستخدم');
      }
    },

    update: async (token: string, userData: Partial<User>): Promise<ApiResponse<User>> => {
      try {
        return await apiRequest('update-profile', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
          body: JSON.stringify(userData),
        });
      } catch (error) {
        throw new Error('فشل في تحديث الملف الشخصي');
      }
    },

    changePassword: async (userId: string, passwords: { currentPassword: string; newPassword: string }): Promise<ApiResponse<null>> => {
      try {
        return await apiRequest(`/profile/${userId}/password`, {
          method: 'PUT',
          body: JSON.stringify(passwords),
        });
      } catch (error) {
        throw new Error('فشل في تغيير كلمة المرور');
      }
    },
  },

  // Coupons endpoints
  coupons: {
    validate: async (code: string, orderAmount: number): Promise<CouponValidationResponse> => {
      try {
        const response = await apiRequest('coupons/validate', {
          method: 'POST',
          body: JSON.stringify({ code, order_amount: orderAmount }),
        });
        return response;
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

  // Cart endpoints
  cart: {
    get: async () => {
      return await apiRequest('cart', {
        method: 'GET',
      });
    },

    add: async (data: { product_id: number; variation_id?: number | null; quantity: number }) => {
      return await apiRequest('cart', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },

    update: async (cartItemId: number, data: { quantity: number }) => {
      return await apiRequest(`cart/${cartItemId}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
    },

    remove: async (cartItemId: number) => {
      return await apiRequest(`cart/${cartItemId}`, {
        method: 'DELETE',
      });
    },

    clear: async () => {
      return await apiRequest('cart/clear', {
        method: 'POST',
      });
    },
  },
};
