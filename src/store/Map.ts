import { LatLng } from "react-native-maps";
import { create } from "zustand";

import { Marker } from "../types";
import { axios_ as axios } from "./axios";

interface HeatmapState {
  heatMap: LatLng[];
  fetchAreas: () => Promise<void>;
}

export const useHeatmapStore = create<HeatmapState>()((set) => ({
  heatMap: [],

  fetchAreas: async () => {
    try {
      const {
        data: { markers }
      } = await axios.get<{ markers: Marker[] }>("/areas/");

      const points = markers.map((marker) => {
        const { latitude, longitude } = marker.center;
        return { latitude, longitude };
      });

      set({ heatMap: points });
    } catch (error) {
      console.error(error);
      throw new Error(`Error fetching areas`);
    }
  }
}));
