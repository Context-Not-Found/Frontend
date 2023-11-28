import { useQuery } from "@tanstack/react-query";
import { H6 } from "tamagui";

import { ChatRoom } from "@/components";
import { useWebSocket } from "@/hooks";
import { useUser } from "@/hooks/useUser";
import { fetchMessages } from "@/utils/fetchMessages";

const Chat = () => {
  const query = useQuery({ queryKey: ["messages"], queryFn: fetchMessages });
  const { user } = useUser();

  const sendMessage = useWebSocket({
    queryKey: ["messages"],
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
