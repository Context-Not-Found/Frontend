import { ChatRoom } from "../../../components";
import { useChatStore } from "../../../store";

const Chat = () => {
  const { messages, setMessage } = useChatStore();

  return <ChatRoom messages={messages} onSend={setMessage} />;
};

export default Chat;
