import { ChatRoom } from "@/components";
import { useHelpBotStore } from "@/store";

const Help = () => {
  const { messages, isTyping, sendMessage } = useHelpBotStore();

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
