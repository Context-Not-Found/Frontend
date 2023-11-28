import * as Location from "expo-location";

import { axios_ as axios } from "./axios";

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
