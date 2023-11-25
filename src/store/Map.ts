import AsyncStorage from "@react-native-async-storage/async-storage";
import { LatLng } from "react-native-maps";
import { create } from "zustand";

import { Marker } from "../types";
import { axios_ as axios } from "./axios";

interface HeatmapState {
  heatMap: LatLng[];
  fetchAreas: () => Promise<void>;
}

export const useHeatmapStore = create<HeatmapState>((set) => ({
  heatMap: [],

  fetchAreas: async () => {
    try {
      const cachedHeatMap = await AsyncStorage.getItem("heatMap");

      if (cachedHeatMap !== null) {
        set({ heatMap: JSON.parse(cachedHeatMap) });
        console.log("Fetched Cached heatmap");
        return;
      }

      const {
        data: { markers }
      } = await axios.get<{ markers: Marker[] }>("/areas/");

      const points = markers.map(({ center: { latitude, longitude } }) => {
        return { latitude, longitude };
      });

      set({ heatMap: points });
      // Caching the Data
      AsyncStorage.setItem("heatMap", JSON.stringify(points));
    } catch (error) {
      console.error(error);
      throw new Error(`Error fetching areas`);
    }
  }
}));
