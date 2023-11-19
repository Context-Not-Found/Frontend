import { IMessage } from "react-native-gifted-chat";
import { create } from "zustand";

import { Ticket, TicketMsg } from "../types";
import { useUserStore } from "./User";
import { axios_ as axios } from "./axios";

interface TicketState {
  tickets: Ticket[];
  ticketMsgs: IMessage[];
  setMessage: (msg: IMessage[]) => void;
  clearMsg: () => void;
  fetchTickets: () => Promise<void>;
  fetchTicketMsgs: (ticketId: string) => Promise<void>;
  createTicket: (ticket: Ticket) => Promise<void>;
  closeTicket: (ticketId: string) => Promise<void>;
}

export const useTicketStore = create<TicketState>()((set) => ({
  // states
  tickets: [],
  ticketMsgs: [],

  // Actions
  setMessage: (msg) => {
    set((state) => ({
      ticketMsgs: [...state.ticketMsgs, ...msg]
    }));
  },

  clearMsg: () => {
    set({ ticketMsgs: [] });
  },

  createTicket: async (ticket) => {
    const { user } = useUserStore.getState();
    delete ticket.rating;

    try {
      const { data } = await axios.post("/tickets/create/", {
        ...ticket,
        user_id: user?.user_id
      });
      set((state) => ({
        tickets: [...state.tickets, data]
      }));
    } catch (error) {
      console.error(error);
      throw new Error(`Error Creating ticket`);
    }
  },

  closeTicket: async (ticketId) => {
    try {
      await axios.patch(`/tickets/close/${ticketId}`);

      set((state) => ({
        tickets: state.tickets.filter(
          (ticket) => ticket.ticket_id !== Number(ticketId)
        )
      }));
    } catch (error) {
      console.error(error);
      throw new Error(`Error closing ticket: ${ticketId}`);
    }
  },

  fetchTickets: async () => {
    const { user } = useUserStore.getState();

    try {
      const { data: tickets } = await axios.get(`/tickets/${user?.user_id}`);
      set({ tickets });
    } catch (error) {
      console.error(error);
      throw new Error(`Error fetching tickets`);
    }
  },

  fetchTicketMsgs: async (ticketId) => {
    try {
      const { data } = await axios.get(`/tickets/messages/${ticketId}`);

      const messages = data.map((message: TicketMsg) => ({
        _id: message.message_id,
        createdAt: message.created_at,
        text: message.message_text,
        user: {
          _id: message.user_id,
          name: `User ${message.user_id}`
        }
      }));

      set({ ticketMsgs: messages });
    } catch (error) {
      console.error(error);
      throw new Error(`Error fetching ticket: ${ticketId} messages`);
    }
  }
}));
