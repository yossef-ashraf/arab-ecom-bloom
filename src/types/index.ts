
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
