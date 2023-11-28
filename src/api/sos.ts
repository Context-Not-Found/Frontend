import * as Location from "expo-location";

import { SOS } from "@/types";
import { axios_ as axios } from "@/utils/axios";

export const sosKeys = {
  sos: (user_id: number) => [user_id, "sos"] as const
};

export const closeSOS = async (user_id: number) => {
  console.log(`Closing SOS for user_id: ${user_id}.`);
  try {
    await axios.patch(`/sos/close/${user_id}`);
  } catch (error) {
    console.error("Error closing SOS:", error);
    throw new Error(`Error closing SOS: ${error}`);
  }
};

export const createSOS = async ({
  user_id,
  location
}: {
  user_id: number;
  location: Location.LocationObject;
}) => {
  console.log(`Creating SOS for user_id: ${user_id}. Location: ${location}`);
  try {
    await axios.post("/sos/create", {
      user_id: user_id,
      lat: location.coords.latitude,
      long: location.coords.longitude
    });
    return;
  } catch (error) {
    console.error("Error creating SOS:", error);
    throw new Error(`Error creating SOS: ${error}`);
  }
};

export const fetchNotifications = async () => {
  try {
    const { data: notifications } = await axios.get<SOS[]>("/sos/");
    return notifications;
  } catch (error) {
    throw new Error("Error fetching notifications");
  }
};
