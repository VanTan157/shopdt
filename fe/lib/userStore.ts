import { create } from "zustand";

type AccountType = {
  userId: string;
  name: string;
  email: string;
  type: string;
};

type UserState = {
  user: AccountType | null;
  setUser: (user: AccountType | null) => void;
};

export const useUserStore = create<UserState>((set) => ({
  user: null, // Giá trị mặc định là null
  setUser: (user) => set({ user }),
}));
