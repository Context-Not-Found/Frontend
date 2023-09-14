import { useEffect, useRef } from 'react';

export const useWebSocket = (url, setMessage) => {
  const ws = useRef(new WebSocket(url)).current;

  useEffect(() => {
    // Event on connecting websocket
    ws.onopen = () => {
      console.log(`WebSocket is connected to ${url}`);
    };

    // Event on closing websocket
    ws.onclose = () => {
      console.log('WebSocket connection closed.');
    };

    // Handling errors
    ws.onerror = (e) => {
      console.error(e.message);
    };

    // Handle incoming messages
    ws.onmessage = (e) => {
      const message = JSON.parse(e.data);
      setMessage(message);
    };

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, [url, setMessage]);

  const sendMessage = (message) => {
    ws.send(message);
  };

  return { sendMessage };
};
