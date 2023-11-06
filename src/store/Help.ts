import { create } from "zustand";

import { axios_ as axios } from "./axios";

interface HelpBotState {
  messages: object[];
  isTyping: boolean;
  sendMessage: (message: string) => Promise<void>;
}

export const useHelpBotStore = create<HelpBotState>()((set) => ({
  messages: [],
  isTyping: false,

  sendMessage: async (message) => {
    try {
      set((state) => ({
        messages: [...state.messages, { type: "user", text: message }]
      }));
      set({ isTyping: true });

      const {
        data: { response }
      } = await axios.post("/chatbot", { message });

      set({ isTyping: false });

      set((state) => ({
        messages: [...state.messages, { type: "bot", text: response }]
      }));
    } catch (error) {
      set({ isTyping: false });
      console.error("Error sending message:", error);

      if (error!.response) {
        console.error("Server Response:", error.response.data);
      }
    }
  }
}));
