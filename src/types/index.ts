
export interface Product {
  id: string;
  name: string;
  price: number;
  discount: boolean;
  discountPrice: number;
  category: string;
  image: string;
  rating: number;
  description: string;
  stock: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: CartItem[];
  shippingAddress: {
    name: string;
    street: string;
    city: string;
    zipCode: string;
    phone: string;
  };
  paymentMethod: string;
}

export interface PaymentCard {
  id: string;
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  isDefault: boolean;
}

// إضافة واجهات للتوثيق
export interface ApiEndpoint {
  name: string;
  description: string;
  request: {
    method: string;
    url: string;
    headers: Record<string, string>;
    body?: any;
  };
  response: {
    status: number;
    body: any;
    headers: Record<string, string>;
  };
  errorResponses?: Array<{
    status: number;
    body: any;
  }>;
}

export interface ApiDocumentation {
  info: {
    name: string;
    version: string;
    description: string;
  };
  endpoints: ApiEndpoint[];
}

export interface PostmanCollection {
  info: {
    _postman_id: string;
    name: string;
    description: string;
    schema: string;
  };
  item: Array<any>;
  variable: Array<{
    key: string;
    value: string;
    type: string;
  }>;
}
