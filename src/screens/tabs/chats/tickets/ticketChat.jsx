import React, { useEffect } from 'react';
import { ChatRoom } from '../../../../components';
import { useWebSocket } from '../../../../hooks/useWebSocket';
import { useTicketStore } from '../../../../store';

const TicketChat = ({ route }) => {
  const { messages, getTicketMessages, setMessage } = useTicketStore();
  const { ticket_id, user_id } = route.params;

  const { sendMessage } = useWebSocket(
    `ws://womenprotection.onrender.com/ws/${ticket_id}/${user_id}`,
    setMessage
  );

  useEffect(() => {
    getTicketMessages(ticket_id);
  }, []);

  const sendMsg = (msg) => {
    sendMessage(msg[0].text);
  };

  return <ChatRoom messages={messages} onSend={sendMsg} user={user_id} />;
};

export default TicketChat;
