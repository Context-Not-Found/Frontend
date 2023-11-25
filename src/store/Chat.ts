import AsyncStorage from "@react-native-async-storage/async-storage";
import { IMessage } from "react-native-gifted-chat";
import { create } from "zustand";

import { Message } from "../types";
import { axios_ as axios } from "./axios";

interface ChatsState {
  messages: IMessage[];
  setMessage: (msg: Message) => void;
  fetchMessages: () => Promise<void>;
}

export const useChatStore = create<ChatsState>()((set) => ({
  messages: [],

  setMessage: (msg) => {
    set((state) => {
      const updatedMessages = [
        ...state.messages,
        {
          _id: msg.message_id,
          createdAt: msg.created_at,
          text: msg.message_text,
          user: {
            _id: msg.user.user_id!,
            name: msg.user.name
          }
        }
      ];

      // Cache the new message
      AsyncStorage.setItem("groupMsg", JSON.stringify(updatedMessages));
      return { messages: updatedMessages };
    });
  },

  fetchMessages: async () => {
    try {
      const cachedMessages = await AsyncStorage.getItem("groupMsg");

      if (cachedMessages) {
        set({ messages: JSON.parse(cachedMessages) });
        console.log("Fetched Cached GroupMsgs");
        return;
      }

      const { data } = await axios.get<Message[]>("/community_chat/messages");

      const messages: IMessage[] = data.map((message) => ({
        _id: message.message_id,
        text: message.message_text,
        createdAt: new Date(message.created_at),
        user: {
          _id: message.user.user_id!,
          name: message.user.name
        }
      }));

      set({ messages });

      AsyncStorage.setItem("groupMsg", JSON.stringify(messages));
    } catch (error) {
      console.error(error);
      throw new Error("Error fetching community messages");
    }
  }
}));
