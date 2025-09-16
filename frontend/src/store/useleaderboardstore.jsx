import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useleaderboardStore = create((set) => ({
  leaderboard: [],
  loading: false,
  error: null,

  fetchLeaderboard: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await axiosInstance.get("/game/leaderboard"); 
      set({ leaderboard: data.leaderboard, loading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || err.message, loading: false });
    }
  },
}));
