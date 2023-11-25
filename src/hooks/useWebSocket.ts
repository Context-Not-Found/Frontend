import { useEffect, useRef } from "react";
import { IMessage } from "react-native-gifted-chat";

const BASE_WS_URL = "ws://womenprotection.onrender.com/ws";

export const useWebSocket = <T>({ setMessage, url }: WebSocketHook<T>) => {
  const wsURL = BASE_WS_URL + url;

  const { current: socket } = useRef<WebSocket>(new WebSocket(wsURL));

  useEffect(() => {
    // Event on connecting websocket
    socket.onopen = () => {
      console.log(`WebSocket connected: ${url}`);
    };

    // Event on closing websocket
    socket.onclose = () => {
      console.log("WebSocket connection closed.");
    };

    // Handling errors
    socket.onerror = (e) => {
      console.error(`WebSocket Error: ${(e as ErrorEvent).message}`);
    };

    // Handle incoming messages
    socket.onmessage = ({ data }) => {
      const message: T = JSON.parse(data);
      setMessage(message);
    };

    return () => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
    };
  }, [url, setMessage]);

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
  setMessage: (msg: T) => void;
  url: string;
}
