import { create } from 'zustand';
import { axios_ as axios } from './axios';

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
        _id: Number(msg.user.user_id),
        name: msg.user.name
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
          _id: message.user.user_id,
          name: message.user.name
        }
      }));

      set({ groupMessages });
    } catch (error) {
      console.error(`Error fetching community messages`);
    }
  }
}));
