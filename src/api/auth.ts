import { User } from "@/types";
import { axios_ as axios } from "@/utils/axios";

export const loginUser = async (userData: User) => {
  try {
    const { data } = await axios.post<User>("/auth/login", userData);
    return data;
  } catch (error) {
    throw new Error(`Incorrect Credentials, Retry!\nError: ${error}`);
  }
};

export const signUp = async (userData: User) => {
  delete userData.cfg_password;
  try {
    const { data } = await axios.post<User>("/auth/register", userData);
    return data;
  } catch (error) {
    throw new Error(`User Already Created. Error: ${error}`);
  }
};
