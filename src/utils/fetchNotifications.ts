import { SOS } from "@/types";

import { axios_ } from "./axios";

export const fetchNotifications = async () => {
  try {
    const { data: notifications } = await axios_.get<SOS[]>("/sos/");
    return notifications;
  } catch (error) {
    throw new Error("Error fetching notifications");
  }
};
