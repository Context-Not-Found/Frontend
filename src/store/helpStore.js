import { create } from 'zustand';
import { axios_ as axios } from './axios';

export const useHelpBotStore = create((set) => ({
  message: '',
  chatHistory: [],
  isBotTyping: false,

  setMessage: (message) => set({ message }),
  
  setIsBotTyping: (isBotTyping) => set({ isBotTyping }),

  sendMessage: async (message) => {
    try {
      set((state) => ({ chatHistory: [...state.chatHistory, { type: 'user', text: message }] }));
      set({ message: '' });
      set({ isBotTyping: true });

      const {
        data: { response }
      } = await axios.post('/chatbot', { message });

      set({ isBotTyping: false });

      set((state) => ({ chatHistory: [...state.chatHistory, { type: 'bot', text: response }] }));
    } catch (error) {
      set({ isBotTyping: false });
      console.error('Error sending message:', error);
      if (error.response) {
        console.error('Server Response:', error.response.data);
      }
    }
  }
}));
