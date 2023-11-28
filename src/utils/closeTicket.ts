import { axios_ } from "./axios";

export const closeTicket = async (ticketId: string) => {
  try {
    await axios_.patch(`/tickets/close/${ticketId}`);
  } catch (error) {
    throw new Error(`Error closing ticket: ${ticketId}`);
  }
};
