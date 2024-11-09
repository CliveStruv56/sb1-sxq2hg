import create from 'zustand';
import { CartItem } from '../types';

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  total: number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  addItem: (item) => {
    set((state) => {
      const existingItem = state.items.find(
        (i) => i.product.id === item.product.id && 
        i.options.milk === item.options.milk
      );

      if (existingItem) {
        return {
          items: state.items.map((i) =>
            i.product.id === item.product.id && i.options.milk === item.options.milk
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }

      return { items: [...state.items, item] };
    });
  },
  removeItem: (productId) => {
    set((state) => ({
      items: state.items.filter((item) => item.product.id !== productId),
    }));
  },
  clearCart: () => set({ items: [] }),
  get total() {
    return get().items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  },
}));