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
  Area,
  Address
} from '@/types';

const BASE_URL = 'http://localhost:8000/api/';

// Mock data for development (will be replaced with real API calls)
// api.ts
export const getProducts = async () => {
  const res = await fetch('http://127.0.0.1:8000/api/products/');
  if (!res.ok) throw new Error('Failed to fetch products');
  const json = await res.json();
  return json.data; // because the API returns { status, message, data }
};

export const getProductsByCategory = async (categoryId: number) => {
  const res = await fetch(`http://127.0.0.1:8000/api/categories/${categoryId}`);
  if (!res.ok) throw new Error('Failed to fetch category products');
  const json = await res.json();
  console.log(json.data.products)
  return json.data.products;
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

// Define types to match Postman collection
interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  gender: 'male' | 'female';
  date_of_birth: string;
  created_at: string;
  updated_at: string;
  email_verified_at?: string | null;
}

interface AuthResponse {
  status: string;
  message: string;
  data: {
    user: User;
    access_token: string;
    token_type: string;
  };
}

// API helper function
const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || `HTTP error! status: ${response.status}`);
  }

  return data;
};

export const api = {
  // Authentication endpoints
  auth: {
    login: async (credentials: LoginRequest): Promise<AuthResponse> => {
      return await apiRequest('login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });
    },

    register: async (userData: RegisterRequest): Promise<AuthResponse> => {
      return await apiRequest('register', {
        method: 'POST',
        body: JSON.stringify(userData),
      });
    },

    logout: async (token: string): Promise<ApiResponse<null>> => {
      return await apiRequest('logout', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
    },

    verifyToken: async (token: string): Promise<ApiResponse<User>> => {
      return await apiRequest('user', {
        headers: { Authorization: `Bearer ${token}` },
      });
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
