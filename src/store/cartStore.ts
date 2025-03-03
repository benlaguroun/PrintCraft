import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, CartItem } from '../types';

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, quantity: number, customization?: any) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getSubtotal: () => number;
  getTax: () => number;
  getShipping: () => number;
  itemCount: () => number;
  applyDiscount: (code: string) => boolean;
  discount: { code: string; amount: number; type: 'percentage' | 'fixed' } | null;
  removeDiscount: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      discount: null,
      
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
        set({ items: [], discount: null });
      },
      
      getSubtotal: () => {
        return get().items.reduce(
          (total, item) => {
            const itemPrice = item.variant?.price || item.product.price;
            const salePrice = item.product.salePrice;
            const finalPrice = salePrice && salePrice < itemPrice ? salePrice : itemPrice;
            return total + finalPrice * item.quantity;
          },
          0
        );
      },
      
      getTax: () => {
        return get().getSubtotal() * 0.08; // 8% tax rate
      },
      
      getShipping: () => {
        const subtotal = get().getSubtotal();
        // Free shipping for orders over $75
        if (subtotal >= 75) return 0;
        // Base shipping rate
        return 5.99;
      },
      
      getTotal: () => {
        const subtotal = get().getSubtotal();
        const tax = get().getTax();
        const shipping = get().getShipping();
        let total = subtotal + tax + shipping;
        
        // Apply discount if available
        const discount = get().discount;
        if (discount) {
          if (discount.type === 'percentage') {
            total -= subtotal * (discount.amount / 100);
          } else {
            total -= discount.amount;
          }
        }
        
        return Math.max(0, total); // Ensure total is not negative
      },
      
      itemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
      
      applyDiscount: (code) => {
        // In a real app, you would validate the code against a database
        // For demo purposes, we'll use some hardcoded values
        const discounts = {
          'WELCOME10': { amount: 10, type: 'percentage' as const },
          'FREESHIP': { amount: get().getShipping(), type: 'fixed' as const },
          'SAVE20': { amount: 20, type: 'percentage' as const },
        };
        
        const upperCode = code.toUpperCase();
        if (upperCode in discounts) {
          set({ discount: { code: upperCode, ...discounts[upperCode as keyof typeof discounts] } });
          return true;
        }
        
        return false;
      },
      
      removeDiscount: () => {
        set({ discount: null });
      }
    }),
    {
      name: 'cart-storage', // unique name for localStorage
    }
  )
);