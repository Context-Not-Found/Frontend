import { Ticket } from "@/types";

import { axios_ as axios } from "./axios";

export const createTicket = async (user_id: number, ticket: Ticket) => {
  delete ticket.rating;

  try {
    const { data } = await axios.post<Ticket>("/tickets/create/", {
      ...ticket,
      user_id: user_id
    });
    return data;
  } catch (error) {
    throw new Error(`Error Creating ticket`);
  }
};
