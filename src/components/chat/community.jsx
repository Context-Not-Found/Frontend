import { useWebSocket } from '../../hooks/useWebSocket';
import { useCommunityStore, useUserStore } from '../../store';
import ChatRoom from './chatRoom';

export default function RoomScreen() {
  const { groupMessages, setMessage } = useCommunityStore();
  const {
    user: { user_id }
  } = useUserStore();

  const { sendMessage } = useWebSocket(
    `ws://womenprotection.onrender.com/ws/community_chat/${user_id}`,
    setMessage
  );

  const sendMsg = (msg) => {
    sendMessage(msg[0].text);
  };

  return <ChatRoom messages={groupMessages} onSend={sendMsg} user={user_id} />;
}
