export type Category = 'Coffees' | 'Teas' | 'Cakes' | 'Hot Chocolate';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  image: string;
  options?: {
    milks?: boolean;
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
  options: {
    milk?: 'whole' | 'semi' | 'oat' | 'almond' | 'soy';
  };
}

export interface TimeSlot {
  time: string;
  available: boolean;
}