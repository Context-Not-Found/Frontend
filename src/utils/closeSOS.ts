import { axios_ } from "./axios";

export const closeSOS = async (user_id: number) => {
  console.log(`Closing SOS for user_id: ${user_id}.`);
  try {
    await axios_.patch(`/sos/close/${user_id}`);
  } catch (error) {
    console.error("Error closing SOS:", error);
    throw new Error(`Error closing SOS: ${error}`);
  }
};
