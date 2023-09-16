import { create } from 'zustand';
import { axios_ as axios } from './axios';
import { useUserStore } from './userStore';

export const useTicketStore = create((set) => ({
  // states
  tickets: [],
  messages: [],

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
      messages: [...state.messages, message]
    }));
  },

  createTicket: async (ticket) => {
    const {
      user: { user_id }
    } = useUserStore.getState();

    try {
      if (user_id) {
        delete ticket.rating;
        const { data } = await axios.post('/tickets/create/', { ...ticket, user_id });
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
  },

  getTicketMessages: async (ticketId) => {
    try {
      const { data } = await axios.get(`/tickets/messages/${ticketId}`);

      const messages = data.map((message) => ({
        _id: message.message_id,
        createdAt: message.created_at,
        text: message.message_text,
        user: {
          _id: message.user_id,
          name: `User ${message.user_id}`
        }
      }));

      set({ messages });
    } catch (error) {
      console.error(`Error fetching ticket messages for ticket ${ticketId}: ${error.message}`);
    }
  }
}));
