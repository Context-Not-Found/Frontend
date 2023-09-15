import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { axios_ as axios } from './axios';

export const useUserStore = create(
  persist(
    (set) => ({
      // states
      user: null,
      error: null,
      isLoading: false,

      // actions
      setError: (errorMsg) => {
        set({ error: errorMsg });
      },

      setLoading: (isLoading) => {
        set({ isLoading });
      },

      loginUser: async (userData) => {
        try {
          const { data } = await axios.post('/auth/login', userData);
          set({ user: data, error: null });
        } catch (error) {
          set({ error: 'Incorrect Credentials, Retry!' });
        }
      },

      signUpUser: async (userData) => {
        try {
          const { data } = await axios.post('/auth/register', userData);
          set({ user: data, error: null });
        } catch (error) {
          set({ error: 'User Already Created.' });
        }
      },

      logoutUser: () => {
        set({ user: null, error: null });
        useUserStore.persist.clearStorage();
      }
    }),
    {
      name: 'userDetails',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ user: state.user })
    }
  )
);
