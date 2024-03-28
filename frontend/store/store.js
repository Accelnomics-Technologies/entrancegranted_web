import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const defaultUser = {
  userId: "",
  token: "",
  email: "",
  role: "",
  firstName: "",
  lastName: "",
  isAuthenticated: false,
};



export const useAppStore = create(
  devtools(
    persist(
      (set) => ({
       
        user: defaultUser,
        login: (user) => set({ user: { ...user, isAuthenticated: true } }),
        logout: () => set({ user: defaultUser,}),
    
      }),
      {
        name: "app-store",
      }
    )
  )
);
