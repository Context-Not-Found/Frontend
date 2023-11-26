import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

import { SOS } from "@/types";

import { axios_ as axios } from "./axios";

interface NotifyState {
  notifications: SOS[];
  fetchNotifications: () => Promise<void>;
}

export const useNotificationStore = create<NotifyState>((set) => ({
  notifications: [],

  fetchNotifications: async () => {
    try {
      const cachedNotifications = await AsyncStorage.getItem("notifications");

      if (cachedNotifications) {
        set({ notifications: JSON.parse(cachedNotifications) });
        console.log("Fetched Cached notifications");
        return;
      }

      const { data: notifications } = await axios.get<SOS[]>("/sos/");
      set({ notifications });
      AsyncStorage.setItem("notifications", JSON.stringify(notifications));
    } catch (error) {
      console.error(error);
      throw new Error("Error fetching notifications");
    }
  }
}));
