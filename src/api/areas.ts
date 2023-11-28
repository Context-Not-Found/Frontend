import { LatLng } from "react-native-maps";

import { Marker } from "@/types";
import { axios_ as axios } from "@/utils/axios";

export const areasKeys = {
  heatmap: ["heatMap"] as const
};

export async function fetchAreas(): Promise<LatLng[]> {
  try {
    const {
      data: { markers }
    } = await axios.get<{ markers: Marker[] }>("/areas/");

    const points = markers.map(({ center: { latitude, longitude } }) => {
      return { latitude, longitude };
    });
    return points;
  } catch (error) {
    console.error(`Error fetching areas. Error: ${error}`);
    throw new Error(`Error fetching areas. Error: ${error}`);
  }
}
