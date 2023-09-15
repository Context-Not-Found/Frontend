import { create } from 'zustand';
import { axios_ as axios } from './axios';

export const useHeatmapStore = create((set) => ({
  heatMap: [],

  fetchAreas: async () => {
    try {
      const {
        data: { markers }
      } = await axios.get('/areas/');

      set({ heatMap: markers });
    } catch (error) {
      console.error(`Error fetching areas`);
    }
  },

  getColorByRadius: (radius) => {
    const colorScale = [
      { radiusMax: 15, color: 'rgba(255,255,0,0.5)' },
      { radiusMax: 30, color: 'rgba(255,128,0,0.5)' },
      { radiusMax: 40, color: 'rgba(255,0,0,0.5)' }
    ];

    const matchingColor = colorScale.find((item) => radius <= item.radiusMax);

    return matchingColor ? matchingColor.color : 'rgba(255,0,0,0.5)';
  }
}));
