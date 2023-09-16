import { create } from 'zustand';
import { axios_ as axios } from './axios';

export const useNotificationStore = create((set) => ({
  notifications: [],

  fetchNotifications: async () => {
    try {
      const { data } = await axios.get('/sos/');

      set({ notifications: data });
    } catch (error) {
      console.error(`Error fetching notifications`);
    }
  }
}));
