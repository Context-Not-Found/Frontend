import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { H6 } from "tamagui";

import { fetchTicketMsgs, ticketKeys } from "@/api/ticket";
import { ChatRoom } from "@/components";
import { useWebSocket } from "@/hooks";
import { type TicketParams } from "@/types";

const Chat = () => {
  const { ticketId, userId } = useLocalSearchParams<TicketParams>();
  const query = useQuery({
    queryKey: ticketKeys.ticket_msgs(Number(userId!), ticketId!),
    queryFn: async () => await fetchTicketMsgs(ticketId!)
  });

  const sendMessage = useWebSocket({
    queryKey: ticketKeys.ticket_msgs(Number(userId!), ticketId!),
    url: `/${ticketId}/${userId}`
  });

  return (
    <>
      {query.isError ? (
        <H6>Error... {query.error.message}</H6>
      ) : query.isLoading ? (
        <H6>Loading Ticket Chat...</H6>
      ) : (
        <ChatRoom messages={query.data!} onSend={sendMessage} />
      )}
    </>
  );
};

export default Chat;
