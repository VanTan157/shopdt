import { create } from "zustand";

export const useCartStore = create((set) => ({
  cartCount: 0,
  setCartCount: (count) => set({ cartCount: count }),
  incrementCartCount: (amount) =>
    set((state) => ({ cartCount: state.cartCount + amount })),
  decrementCartCount: (amount) =>
    set((state) => ({ cartCount: state.cartCount - amount })),
}));
