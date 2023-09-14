import { useEffect, useRef } from 'react';
import { useCommunityStore } from '../../store/chatStore';
import { useUserStore } from '../../store/userStore';
import ChatRoom from './chatRoom';

export default function RoomScreen() {
  const { groupMessages, fetchMessages, setMessage } = useCommunityStore();
  const {
    user: { user_id }
  } = useUserStore();

  var ws = useRef(
    new WebSocket(`ws://womenprotection.onrender.com/ws/community_chat/${user_id}`)
  ).current;

  useEffect(() => {
    // Event on connecting websocket
    ws.onopen = () => {
      console.log(`Web Socket is connected to user ${user_id}`);
    };

    // Event on closing websocket
    ws.onclose = () => {
      console.log('WebSocket connection closed.');
    };

    // Handling errors
    ws.onerror = (e) => {
      console.error(e.message);
    };

    // Handle incomming messages
    ws.onmessage = (e) => {
      const message = JSON.parse(e.data);
      setMessage(message);
    };

    // Fetching messages
    fetchMessages();

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);

  const sendMsg = (msg) => {
    ws.send(msg[0].text);

    setMessage(msg[0]);
  };

  return <ChatRoom messages={groupMessages} onSend={sendMsg} />;
}
