
// أنواع البيانات الأساسية للكتب الإلكترونية
export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  discount: boolean;
  discountPrice: number;
  category: string;
  image: string;
  rating: number;
  description: string;
  isbn: string;
  publisher: string;
  publicationDate: string;
  language: string;
  pageCount: number;
  format: 'pdf' | 'epub' | 'mobi';
  fileSize: string;
  inStock: boolean;
}

export interface CartItem extends Book {
  quantity: number;
}

// أنواع بيانات المستخدم
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  governorate: string;
  city: string;
  address: string;
  birthDate: string;
  gender: 'male' | 'female';
  createdAt: string;
  isActive: boolean;
}

// أنواع بيانات الطلبات
export interface Order {
  id: string;
  userId: string;
  orderDate: string;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  totalAmount: number;
  items: CartItem[];
  shippingAddress: {
    governorate: string;
    city: string;
    address: string;
    phone: string;
  };
  paymentMethod: 'cash' | 'card' | 'vodafone_cash' | 'orange_cash' | 'etisalat_cash';
  paymentStatus: 'pending' | 'paid' | 'failed';
  notes?: string;
}

// أنواع بيانات المراجعات
export interface Review {
  id: string;
  userId: string;
  bookId: string;
  rating: number;
  comment: string;
  reviewDate: string;
  userName: string;
}

// أنواع بيانات الفئات
export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  booksCount: number;
}

// أنواع الاستجابات من الـ API
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  errors?: string[];
}

// أنواع بيانات التوثيق
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  governorate: string;
  city: string;
  address: string;
  birthDate: string;
  gender: 'male' | 'female';
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    user: User;
    token: string;
  };
}

// أنواع بيانات البحث والفلترة
export interface SearchFilters {
  category?: string;
  author?: string;
  minPrice?: number;
  maxPrice?: number;
  language?: string;
  format?: string;
  rating?: number;
  sortBy?: 'title' | 'price' | 'rating' | 'publishDate';
  sortOrder?: 'asc' | 'desc';
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  success: boolean;
  message: string;
  data: T[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

// أنواع بيانات المحافظات المصرية
export interface Governorate {
  id: string;
  name: string;
  cities: string[];
}
