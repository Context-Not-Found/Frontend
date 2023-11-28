import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { IMessage } from "react-native-gifted-chat";

import { Message } from "@/types";

const BASE_WS_URL = "ws://womenprotection.onrender.com/ws";

export const useWebSocket = <T>({ queryKey, url }: WebSocketHook<T>) => {
  const wsURL = BASE_WS_URL + url;

  const queryClient = useQueryClient();

  const { current: socket } = useRef<WebSocket>(new WebSocket(wsURL));

  useEffect(() => {
    // Event on connecting websocket
    socket.onopen = () => {
      console.log(`WebSocket connected: ${url}`);
    };

    // Evnt on closing websocket
    socket.onclose = () => {
      console.log("WebSocket connection closed.");
    };

    // Handling errors
    socket.onerror = (e) => {
      console.error(`WebSocket Error: ${(e as ErrorEvent).message}`);
    };

    // Handle incoming messages
    socket.onmessage = ({ data }) => {
      const msg: Message = JSON.parse(data);
      queryClient.setQueryData(queryKey, (oldMessage: IMessage[]) => {
        return [
          ...oldMessage,
          {
            _id: msg.message_id,
            createdAt: msg.created_at,
            text: msg.message_text,
            user: {
              _id: msg.user.user_id!,
              name: msg.user.name
            }
          }
        ];
      });
    };

    return () => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
    };
  }, [url, queryClient]);

  const sendMessage = (msg: IMessage[]) => {
    if (socket.readyState === WebSocket.OPEN) {
      socket.send(msg[0].text);
    } else {
      console.error("WebSocket is not open to send messages.");
    }
  };

  return sendMessage;
};

interface WebSocketHook<T> {
  queryKey: readonly T[];
  url: string;
}
