import { IMessage } from "react-native-gifted-chat";

import { Message } from "@/types";

import { axios_ } from "./axios";

export async function fetchMessages(): Promise<IMessage[]> {
  try {
    const { data } = await axios_.get<Message[]>("/community_chat/messages");

    const messages: IMessage[] = data.map((message) => ({
      _id: message.message_id,
      text: message.message_text,
      createdAt: new Date(message.created_at),
      user: {
        _id: message.user.user_id!,
        name: message.user.name
      }
    }));
    return messages;
  } catch (error) {
    console.error(`Error fetching community messages. Erro: ${error}`);
    throw new Error("Error fetching community messages");
  }
}
