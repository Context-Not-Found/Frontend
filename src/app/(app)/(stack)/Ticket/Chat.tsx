import { useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";

import { ChatRoom } from "../../../../components";
import { useWebSocket } from "../../../../hooks";
import { useTicketStore } from "../../../../store";
import { type TicketParams } from "./index";

const Chat = () => {
  const { ticketMsgs, fetchTicketMsgs, setMessage, clearMsg } =
    useTicketStore();
  const { ticketId, userId } = useLocalSearchParams<TicketParams>();

  useEffect(() => {
    fetchTicketMsgs(ticketId!);

    return () => clearMsg();
  }, [ticketId]);

  const sendMessage = useWebSocket({
    setMessage,
    url: `/${ticketId}/${userId}`
  });

  return <ChatRoom messages={ticketMsgs} onSend={sendMessage} />;
};

export default Chat;
