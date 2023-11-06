import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { User } from "../types";
import { axios_ as axios } from "./axios";

type UserStore = {
  user: User | undefined;
  error: string | undefined;
  isLoading: boolean;
  login: (userData: User) => Promise<void>;
  signUp: (userData: User) => Promise<void>;
  logout: () => void;
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      // states
      user: undefined,
      error: undefined,
      isLoading: false,

      // actions
      login: async (userData) => {
        set({ isLoading: true });
        try {
          const { data } = await axios.post("/auth/login", userData);
          set({ user: data, error: undefined, isLoading: false });
          router.replace("/");
        } catch (error) {
          set({ error: "Incorrect Credentials, Retry!", isLoading: false });
        }
      },

      signUp: async (userData) => {
        delete userData.cfg_password;
        set({ isLoading: true });
        try {
          const { data } = await axios.post("/auth/register", userData);
          set({ user: data, error: undefined, isLoading: false });
          router.replace("/");
        } catch (error) {
          set({ error: "User Already Created.", isLoading: false });
        }
      },

      logout: () => {
        set({ isLoading: true });
        useUserStore.persist.clearStorage();
        set({ user: undefined, error: undefined, isLoading: false });
      }
    }),
    {
      name: "user-details",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ user: state.user })
    }
  )
);
