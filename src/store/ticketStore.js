import axios from 'axios';
import { create } from 'zustand';
import { useUserStore } from './userStore';

axios.defaults.baseURL = 'https://womenprotection.onrender.com';

export const useTicketStore = create((set) => ({
  // states
  tickets: [],
  messages: [],

  // Actions
  createTicket: async () => {
    const {
      user: { user_id }
    } = useUserStore.getState();

    try {
      if (user_id) {
        const { data } = await axios.post('/tickets/create/', { user_id });
        set((state) => ({
          tickets: [...state.tickets, data]
        }));
      } else {
        console.error('user_id is undefined');
      }
    } catch (error) {
      console.log(error.message);
    }
  },

  closeTicket: async (ticketId) => {
    try {
      await axios.patch(`/tickets/close/${ticketId}`);

      set((state) => ({
        tickets: state.tickets.filter((ticket) => ticket.ticket_id !== ticketId)
      }));
    } catch (error) {
      console.error(`Error closing ticket ${ticketId}: ${error.message}`);
    }
  },

  getTicketMessages: async (ticketId) => {
    try {
      const { data } = await axios.get(`/tickets/messages/${ticketId}`);
      set({ messages: data });
    } catch (error) {
      console.error(`Error fetching ticket messages for ticket ${ticketId}: ${error.message}`);
    }
  },

  getOpenTickets: async () => {
    const {
      user: { user_id }
    } = useUserStore.getState();

    try {
      if (user_id) {
        const { data } = await axios.get(`/tickets/${user_id}`);
        set({ tickets: data });
      } else {
        console.error('user_id is undefined');
      }
    } catch (error) {
      console.error(`Error fetching tickets: ${error.message}`);
    }
  }
}));