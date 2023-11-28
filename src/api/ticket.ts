import { IMessage } from "react-native-gifted-chat";

import { Ticket } from "@/types";
import { TicketMsg } from "@/types";
import { axios_ as axios } from "@/utils/axios";

export const ticketKeys = {
  tickets: (user_id: number) => [user_id, "tickets"] as const,
  ticket_msgs: (user_id: number, ticket_id: string) =>
    [...ticketKeys.tickets(user_id), ticket_id, "ticket_msgs"] as const
};

export const createTicket = async (user_id: number, ticket: Ticket) => {
  delete ticket.rating;

  try {
    const { data } = await axios.post<Ticket>("/tickets/create/", {
      ...ticket,
      user_id: user_id
    });
    return data;
  } catch (error) {
    throw new Error(`Error Creating ticket`);
  }
};

export const fetchTickets = async (user_id: number) => {
  try {
    const { data: tickets } = await axios.get<Ticket[]>(`/tickets/${user_id}`);
    return tickets;
  } catch (error) {
    throw new Error(`Error fetching tickets`);
  }
};
export const closeTicket = async (ticketId: string) => {
  try {
    await axios.patch(`/tickets/close/${ticketId}`);
  } catch (error) {
    throw new Error(`Error closing ticket: ${ticketId}`);
  }
};

export const fetchTicketMsgs = async (ticketId: string) => {
  try {
    const { data } = await axios.get<TicketMsg[]>(
      `/tickets/messages/${ticketId}`
    );

    const messages: IMessage[] = data.map((message: TicketMsg) => ({
      _id: message.message_id,
      createdAt: new Date(message.created_at),
      text: message.message_text,
      user: {
        _id: message.user_id,
        name: `User ${message.user_id}`
      }
    }));

    return messages;
  } catch (error) {
    throw new Error(`Error fetching ticket: ${ticketId} messages`);
  }
};
