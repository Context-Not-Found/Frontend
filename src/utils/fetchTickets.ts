import { useUser } from "@/hooks/useUser";
import { Ticket } from "@/types";

import { axios_ as axios } from "./axios";

export const fetchTickets = async (user_id: number) => {
  try {
    const { data: tickets } = await axios.get<Ticket[]>(`/tickets/${user_id}`);
    return tickets;
  } catch (error) {
    throw new Error(`Error fetching tickets`);
  }
};
