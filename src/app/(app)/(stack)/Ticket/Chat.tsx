import { useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";

import { ChatRoom } from "../../../../components";
import { useTicketStore } from "../../../../store";

const Chat = () => {
  const { ticketMsgs, fetchTicketMsgs, setMessage, clearMsg } =
    useTicketStore();
  const { id } = useLocalSearchParams<{ id: string }>();

  useEffect(() => {
    fetchTicketMsgs(id!);

    return () => clearMsg();
  }, [id]);

  return <ChatRoom messages={ticketMsgs} onSend={setMessage} />;
};

export default Chat;
