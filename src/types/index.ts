interface User {
  email: string;
  user_id?: number;
  name?: string;
  phone_number?: string;
  password?: string;
  cfg_password?: string;
  is_teacher?: boolean;
}

export type { User };
