import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, SavedDesign } from '../types';

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  login: (userData: User) => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  saveDesign: (design: Omit<SavedDesign, 'id' | 'createdAt'>) => void;
  removeSavedDesign: (designId: string) => void;
  getSavedDesigns: () => SavedDesign[];
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      
      login: (userData) => {
        set({ 
          user: { 
            ...userData, 
            wishlist: userData.wishlist || [],
            savedDesigns: userData.savedDesigns || []
          }, 
          isAuthenticated: true 
        });
      },
      
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
      
      updateUser: (userData) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null
        }));
      },
      
      addToWishlist: (productId) => {
        set((state) => {
          if (!state.user) return state;
          
          const wishlist = state.user.wishlist || [];
          if (wishlist.includes(productId)) return state;
          
          return {
            user: {
              ...state.user,
              wishlist: [...wishlist, productId]
            }
          };
        });
      },
      
      removeFromWishlist: (productId) => {
        set((state) => {
          if (!state.user || !state.user.wishlist) return state;
          
          return {
            user: {
              ...state.user,
              wishlist: state.user.wishlist.filter(id => id !== productId)
            }
          };
        });
      },
      
      isInWishlist: (productId) => {
        const { user } = get();
        return user?.wishlist?.includes(productId) || false;
      },
      
      saveDesign: (design) => {
        set((state) => {
          if (!state.user) return state;
          
          const savedDesigns = state.user.savedDesigns || [];
          const newDesign: SavedDesign = {
            ...design,
            id: `design_${Date.now()}`,
            createdAt: new Date()
          };
          
          return {
            user: {
              ...state.user,
              savedDesigns: [...savedDesigns, newDesign]
            }
          };
        });
      },
      
      removeSavedDesign: (designId) => {
        set((state) => {
          if (!state.user || !state.user.savedDesigns) return state;
          
          return {
            user: {
              ...state.user,
              savedDesigns: state.user.savedDesigns.filter(design => design.id !== designId)
            }
          };
        });
      },
      
      getSavedDesigns: () => {
        const { user } = get();
        return user?.savedDesigns || [];
      }
    }),
    {
      name: 'user-storage', // unique name for localStorage
    }
  )
);