import { useQuery } from "@tanstack/react-query";
import { H6 } from "tamagui";

import { chatKeys, fetchMessages } from "@/api/chat";
import { ChatRoom } from "@/components";
import { useWebSocket } from "@/hooks";
import { useUser } from "@/hooks/useUser";

const Chat = () => {
  const query = useQuery({
    queryKey: chatKeys.community_chat,
    queryFn: fetchMessages
  });
  const { user } = useUser();

  const sendMessage = useWebSocket({
    queryKey: chatKeys.community_chat,
    url: `/community_chat/${user?.user_id}`
  });

  return (
    <>
      {query.isError ? (
        <H6>Error... {query.error.message}</H6>
      ) : query.isLoading ? (
        <H6>Loading Community Chat...</H6>
      ) : (
        <ChatRoom messages={query.data!} onSend={sendMessage} />
      )}
    </>
  );
};

export default Chat;
