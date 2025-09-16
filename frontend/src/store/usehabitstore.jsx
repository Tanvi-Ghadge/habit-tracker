import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-toastify";

export const useHabitStore = create((set, get) => ({
  habits: [],
  progress: null,
  loading: false,
  error: null,

  // Fetch habits
  fetchHabits: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get("/habit", { withCredentials: true });
      set({ habits: res.data, loading: false });
    } catch (error) {
      const errMsg = error.response?.data?.message || error.message;
      set({ error: errMsg, loading: false });
      toast.error(errMsg);
    }
  },

  // Create habit
  createHabit: async (habitData) => {
    try {
      const res = await axiosInstance.post("/habit", habitData, { withCredentials: true });
      set({ habits: [res.data, ...get().habits] });
      toast.success(`Habit "${res.data.name}" added successfully!`);
    } catch (error) {
      const errMsg = error.response?.data?.message || error.message;
      set({ error: errMsg });
      toast.error(errMsg);
    }
  },

  // Update habit
  updateHabit: async (id, updatedData) => {
    try {
      const res = await axiosInstance.put(`/habit/${id}`, updatedData, { withCredentials: true });
      set({
        habits: get().habits.map((h) => (h._id === id ? res.data : h)),
      });
      toast.success(`Habit "${res.data.name}" updated successfully!`);
    } catch (error) {
      const errMsg = error.response?.data?.message || error.message;
      set({ error: errMsg });
      toast.error(errMsg);
    }
  },

  // Delete habit
  deleteHabit: async (id) => {
    try {
      await axiosInstance.delete(`/habit/${id}`, { withCredentials: true });
      set({
        habits: get().habits.filter((h) => h._id !== id),
      });
      // Clear progress if deleted habit is currently shown
      if (get().progress?.habit?._id === id) set({ progress: null });
      toast.info(`Habit deleted.`);
    } catch (error) {
      const errMsg = error.response?.data?.message || error.message;
      set({ error: errMsg });
      toast.error(errMsg);
    }
  },

  // Check-in habit
  checkInHabit: async (habitId) => {
    try {
      const res = await axiosInstance.post(
        "/habit/checkin",
        { habitId },
        { withCredentials: true }
      );
      set({
        habits: get().habits.map((h) =>
          h._id === habitId ? res.data.habit : h
        ),
      });
      toast.success(`Checked in for "${res.data.habit.name}"!`);
    } catch (error) {
      const errMsg = error.response?.data?.message || error.message;
      set({ error: errMsg });
      toast.error(errMsg);
    }
  },

  // Fetch habit progress
  fetchHabitProgress: async (id) => {
    try {
      const res = await axiosInstance.get(`/habit/${id}/progress`, { withCredentials: true });
      set({ progress: res.data });
    } catch (error) {
      const errMsg = error.response?.data?.message || error.message;
      set({ error: errMsg });
      toast.error(errMsg);
    }
  },
}));
