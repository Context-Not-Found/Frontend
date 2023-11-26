import { useId } from "react";
import { IMessage } from "react-native-gifted-chat";
import { create } from "zustand";

import { HelpBotMsg } from "@/types";

import { useUserStore } from "./User";
import { axios_ as axios } from "./axios";

interface HelpBotState {
  messages: IMessage[];
  isTyping: boolean;
  sendMessage: ({ message }: { message: string }) => Promise<void>;
}

export const useHelpBotStore = create<HelpBotState>()((set) => ({
  messages: [],
  isTyping: false,

  sendMessage: async ({ message }) => {
    const _id = useId();
    const { user } = useUserStore.getState();

    try {
      set((state) => ({
        messages: [
          ...state.messages,
          {
            _id,
            createdAt: new Date(),
            text: message,
            user: {
              _id: user!.user_id!,
              name: user?.name
            }
          }
        ]
      }));

      set({ isTyping: true });

      const {
        data: { response }
      } = await axios.post<HelpBotMsg>("/chatbot", { message });

      set((state) => ({
        messages: [
          ...state.messages,
          {
            _id,
            createdAt: new Date(),
            text: response,
            user: {
              _id: user!.user_id!,
              name: user?.name
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
