import { create } from "zustand";

export interface Profile {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  linkedin: string;
  workExperience: string[];
  skills: string[];
  yearsOfExperience: number;
  phoneNumber: string;
  education: string[];
}
interface ProfileStore {
  profile: Profile | null;
  setProfile: (profile: Profile) => void;
  getProfile: () => Profile | null;
}

const useProfileStore = create<ProfileStore>((set, get) => ({
  profile: null,
  setProfile: (profile) => set({ profile }),
  getProfile: () => get().profile,
}));

export default useProfileStore;
