import { IMessage } from "react-native-gifted-chat";

import { HelpBotMsg } from "@/types";

import { axios_ } from "./axios";

export const sendBotMessage = async (msg: IMessage[]) => {
  try {
    const {
      data: { response }
    } = await axios_.post<HelpBotMsg>("/chatbot", { message: msg[0].text });
    return response;
  } catch (error: any) {
    console.error("Error sending message:", error);

    if (error.response) {
      console.error("Server Response:", error.response.data);
    }
  }
};
