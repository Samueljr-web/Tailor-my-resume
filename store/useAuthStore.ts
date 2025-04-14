import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/types/auth";

type AuthStore = {
  isAuthenticated: boolean;
  user: User | null;
  setAuthState: (auth: { isAuthenticated: boolean; user: User }) => void;
  logout: () => void;
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
};

const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      isAuthenticated: false,
      user: null,
      _hasHydrated: false,
      setAuthState: (authState) =>
        set({
          isAuthenticated: authState.isAuthenticated,
          user: authState.user,
        }),
      logout: () => set({ isAuthenticated: false, user: null }),
      setHasHydrated: (state) => set({ _hasHydrated: state }),
    }),
    {
      name: "userLoginStatus",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);

export default useAuthStore;
