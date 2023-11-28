import { User } from "@/types";

import { axios_ as axios } from "./axios";

export const loginUser = async (userData: User) => {
  try {
    const { data } = await axios.post<User>("/auth/login", userData);
    return data;
  } catch (error) {
    throw new Error(`Incorrect Credentials, Retry!\nError: ${error}`);
  }
};
