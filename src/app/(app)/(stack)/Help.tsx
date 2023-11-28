import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { IMessage } from "react-native-gifted-chat";

import { sendBotMessage } from "@/api/chatbot";
import { ChatRoom } from "@/components";

const Help = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const { mutate: sendMessage, isPending: isTyping } = useMutation({
    mutationFn: sendBotMessage,
    onSuccess: (msg) => {
      setMessages((oldMessages) => [
        ...oldMessages,
        {
          _id: new Date().toTimeString(),
          createdAt: new Date(),
          text: msg!,
          user: {
            _id: "ChatBot",
            name: "ChatBot"
          }
        }
      ]);
    },
    onError: (err) => {
      setMessages((oldMessages) => [
        ...oldMessages,
        {
          _id: new Date().toTimeString(),
          createdAt: new Date(),
          text: err.message,
          user: {
            _id: "ChatBot",
            name: "ChatBot"
          }
        }
      ]);
    }
  });

  return (
    <ChatRoom
      messages={messages}
      isTyping={isTyping}
      onSend={sendMessage}
      isHelp
    />
  );
};

export default Help;
