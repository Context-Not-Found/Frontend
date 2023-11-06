interface User {
  email: string;
  user_id?: number;
  name?: string;
  phone_number?: string;
  password?: string;
  cfg_password?: string;
  is_teacher?: boolean;
}

interface Message {
  message_id: number;
  created_at: Date;
  message_text: string;
  user: User;
}

export type { Message, User };
