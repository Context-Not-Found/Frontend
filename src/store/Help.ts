import { IMessage } from "react-native-gifted-chat";
import { create } from "zustand";

import { HelpBotMsg } from "@/types";

import { axios_ as axios } from "./axios";

interface HelpBotState {
  messages: IMessage[];
  isTyping: boolean;
  sendMessage: (msg: IMessage[]) => Promise<void>;
}

export const useHelpBotStore = create<HelpBotState>()((set) => ({
  messages: [],
  isTyping: false,

  sendMessage: async (msg) => {
    try {
      set((state) => ({
        messages: [...state.messages, ...msg]
      }));

      set({ isTyping: true });

      const {
        data: { response }
      } = await axios.post<HelpBotMsg>("/chatbot", { message: msg[0].text });

      set((state) => ({
        messages: [
          ...state.messages,
          {
            _id: new Date().toTimeString(),
            createdAt: new Date(),
            text: response,
            user: {
              _id: "ChatBot",
              name: "ChatBot"
            }
          }
        ]
      }));
    } catch (error: any) {
      console.error("Error sending message:", error);

      if (error.response) {
        console.error("Server Response:", error.response.data);
      }
    } finally {
      set({ isTyping: false });
    }
  }
}));
