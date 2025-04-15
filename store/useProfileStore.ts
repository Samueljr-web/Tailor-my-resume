import { Profile } from "@/types/profile";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ProfileStore {
  profile: Profile | null;
  setProfile: (profile: Profile | undefined) => void;
  getProfile: () => Profile | null;
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
}

const useProfileStore = create(
  persist<ProfileStore>(
    (set, get) => ({
      profile: null,
      _hasHydrated: false,
      setProfile: (profile) => set({ profile }),
      getProfile: () => get().profile,
      setHasHydrated: (state) => set({ _hasHydrated: state }),
    }),
    {
      name: "userProfile",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);

export default useProfileStore;
