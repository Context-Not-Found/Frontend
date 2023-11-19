import { IMessage } from "react-native-gifted-chat";
import { create } from "zustand";

import { Message } from "../types";
import { axios_ as axios } from "./axios";

interface ChatsState {
  messages: IMessage[];
  setMessage: (msg: IMessage[]) => void;
  fetchMessages: () => Promise<void>;
}

export const useChatStore = create<ChatsState>()((set) => ({
  messages: [],

  setMessage: (msg) => {
    set((state) => ({
      messages: [...state.messages, ...msg]
    }));
  },

  fetchMessages: async () => {
    try {
      const { data } = await axios.get("/community_chat/messages");

      const messages: IMessage[] = data.map((message: Message) => ({
        _id: message.message_id,
        text: message.message_text,
        createdAt: new Date(message.created_at),
        user: {
          _id: message.user.user_id,
          name: message.user.name
        }
      }));

      set({ messages });
    } catch (error) {
      console.error(error);
      throw new Error("Error fetching community messages");
    }
  }
}));
