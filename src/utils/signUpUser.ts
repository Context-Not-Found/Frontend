import { User } from "@/types";

import { axios_ as axios } from "./axios";

export const signUp = async (userData: User) => {
  delete userData.cfg_password;
  try {
    const { data } = await axios.post<User>("/auth/register", userData);
    return data;
  } catch (error) {
    throw new Error(`User Already Created. Error: ${error}`);
  }
};
