import { create } from "zustand";

import { SOS } from "../types";
import { axios_ as axios } from "./axios";

interface NotifyState {
  notifications: SOS[];
  fetchNotifications: () => Promise<void>;
}

export const useNotificationStore = create<NotifyState>()((set) => ({
  notifications: [],

  fetchNotifications: async () => {
    try {
      const { data } = await axios.get<SOS[]>("/sos/");

      set({ notifications: data });
    } catch (error) {
      console.error(`Error fetching notifications`);
    }
  }
}));
