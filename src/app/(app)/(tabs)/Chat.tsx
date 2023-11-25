import { ChatRoom } from "../../../components";
import { useWebSocket } from "../../../hooks";
import { useChatStore, useUserStore } from "../../../store";

const Chat = () => {
  const { messages, setMessage } = useChatStore();
  const { user } = useUserStore();

  const sendMessage = useWebSocket({
    setMessage,
    url: `/community_chat/${user?.user_id}`
  });

  return <ChatRoom messages={messages} onSend={sendMessage} />;
};

export default Chat;
