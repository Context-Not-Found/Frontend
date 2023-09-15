import axios from 'axios';
import { create } from 'zustand';

axios.defaults.baseURL = 'https://womenprotection.onrender.com';

export const useCommunityStore = create((set) => ({
  // states
  groupMessages: [],

  // Actions
  setMessage: (msg) => {
    const message = {
      _id: msg.message_id,
      createdAt: msg.created_at,
      text: msg.message_text,
      user: {
        _id: Number(msg.user_id),
        name: `User ${msg.user_id}`
      }
    };

    set((state) => ({
      groupMessages: [...state.groupMessages, message]
    }));
  },

  fetchMessages: async () => {
    try {
      const { data } = await axios.get('/community_chat/messages/');

      const groupMessages = data.map((message) => ({
        _id: message.message_id,
        createdAt: message.created_at,
        text: message.message_text,
        user: {
          _id: message.user_id,
          name: `User ${message.user_id}`
        }
      }));

      set({ groupMessages });
    } catch (error) {
      console.error(`Error fetching community messages`);
    }
  }
}));
``