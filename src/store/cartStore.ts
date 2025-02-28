import { create } from 'zustand';
import { Product, CartItem } from '../types';

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, quantity: number, customization?: any) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  
  addItem: (product, quantity, customization) => {
    set((state) => {
      // Check if the item already exists with the same customization
      const existingItemIndex = state.items.findIndex(
        (item) => 
          item.product.id === product.id && 
          JSON.stringify(item.customization) === JSON.stringify(customization)
      );

      if (existingItemIndex !== -1) {
        // Update quantity if item exists
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity += quantity;
        return { items: updatedItems };
      } else {
        // Add new item
        const newItem: CartItem = {
          id: `${product.id}_${Date.now()}`,
          product,
          quantity,
          customization,
        };
        return { items: [...state.items, newItem] };
      }
    });
  },
  
  removeItem: (itemId) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== itemId),
    }));
  },
  
  updateQuantity: (itemId, quantity) => {
    set((state) => ({
      items: state.items.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      ),
    }));
  },
  
  clearCart: () => {
    set({ items: [] });
  },
  
  getTotal: () => {
    return get().items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  },
}));