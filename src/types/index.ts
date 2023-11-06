// Users
interface User {
  email: string;
  user_id?: number;
  name?: string;
  phone_number?: string;
  password?: string;
  cfg_password?: string;
  is_teacher?: boolean;
}

// Community Msg
interface Message {
  message_id: number;
  created_at: Date;
  message_text: string;
  user: User;
}

// HeatMap
interface Marker {
  center: {
    latitude: number;
    longitude: number;
  };
  radius: number;
}

// Tickets List and Ticket Msg
interface Tickets {
  teacher_id: number;
  user_id: number;
  is_anonymous: boolean;
  ticket_id: number;
  is_open: boolean;
}

interface TicketMsg {
  ticket_id: number;
  user_id: number;
  created_at: string;
  message_text: string;
  message_id: number;
}

// SOS List
interface SOS {
  long: number;
  sos_id: number;
  user_id: number;
  lat: number;
  is_open: boolean;
}

export type { Marker, Message, SOS, TicketMsg, Tickets, User };
