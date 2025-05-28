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
  id: number;
  name: string;
  email: string;
  phone: string;
  gender: 'male' | 'female';
  date_of_birth: string;
  created_at: string;
  updated_at: string;
  email_verified_at: string | null;
  role: string;
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

// أنواع بيانات الفئات
export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  booksCount: number;
  itemCount:number;
}

// أنواع بيانات الكوبونات
export interface Coupon {
  id: number;
  name: string;
  code: string;
  discount_value: number;
  discount_type: 'percentage' | 'fixed';
  valid_from: string;
  valid_to: string;
  is_active: boolean;
  usage_limit: number;
  usage_count: number;
  min_order_amount: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface CouponValidationResponse {
  status: string;
  message: string;
  data: {
    coupon: Coupon;
    discount: number;
    final_amount: number;
  };
}

// أنواع بيانات المناطق والعناوين
export interface Area {
  id: string;
  name: string;
  governorate: string;
  shippingCost: number;
}

export interface Address {
  id: string;
  userId: string;
  name: string;
  phone: string;
  governorate: string;
  city: string;
  area: string;
  street: string;
  building: string;
  floor?: string;
  apartment?: string;
  isDefault: boolean;
}

// أنواع الاستجابات من الـ API
export interface ApiResponse<T> {
  status: 'Success' | 'Error';
  message: string;
  data: T;
}

// أنواع بيانات التوثيق
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  gender: 'male' | 'female';
  date_of_birth: string;
  phone: string;
}

export interface AuthResponse {
  status: string;
  message: string;
  data: {
    user: User;
    access_token: string;
    token_type: string;
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
