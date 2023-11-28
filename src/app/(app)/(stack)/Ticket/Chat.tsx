import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import React from "react";

import { ChatRoom } from "@/components";
import { useWebSocket } from "@/hooks";
import { type TicketParams } from "@/types";
import { fetchTicketMsgs } from "@/utils/fetchTicketMessages";

const Chat = () => {
  const { ticketId, userId } = useLocalSearchParams<TicketParams>();
  const query = useQuery({
    queryKey: ["ticket_msgs", ticketId],
    queryFn: async () => await fetchTicketMsgs(ticketId!)
  });

  const sendMessage = useWebSocket({
    queryKey: ["ticket_msgs", ticketId!],
    url: `/${ticketId}/${userId}`
  });

  return <ChatRoom messages={query.data!} onSend={sendMessage} />;
};

export default Chat;
