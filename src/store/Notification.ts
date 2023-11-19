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
      const { data: notifications } = await axios.get<SOS[]>("/sos/");
      set({ notifications });
    } catch (error) {
      console.error(error);
      throw new Error("rror fetching notifications");
    }
  }
}));
