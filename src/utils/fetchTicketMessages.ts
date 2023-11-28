import { IMessage } from "react-native-gifted-chat";

import { TicketMsg } from "@/types";

import { axios_ as axios } from "./axios";

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
