import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-toastify";

const useSocialStore = create((set) => ({
  feed: [],
  following: [],
  searchResults: [],
  loadingFeed: false,
  loadingFollowing: false,
  loadingSearch: false,

  // ---------------- FETCH FEED ----------------
  fetchFeed: async () => {
    set({ loadingFeed: true });
    try {
      const res = await axiosInstance.get("/social/feed");
      set({ feed: res.data.feed || [] });
    } catch (error) {
      console.error("fetchFeed error:", error);
      toast.error("Failed to load feed");
      set({ feed: [] });
    } finally {
      set({ loadingFeed: false });
    }
  },

  // --------------- FETCH FOLLOWING ----------------
  fetchFollowing: async () => {
    set({ loadingFollowing: true });
    try {
      const res = await axiosInstance.get("/social/following");
      set({ following: res.data.following || [] });
    } catch (error) {
      console.error("fetchFollowing error:", error);
      toast.error("Failed to load following list");
      set({ following: [] });
    } finally {
      set({ loadingFollowing: false });
    }
  },

  // ---------------- SEARCH USERS ----------------
  searchUsers: async (query) => {
    set({ loadingSearch: true });
    try {
      const res = await axiosInstance.get(`/social/search?q=${query}`);
      set({ searchResults: res.data.users || [] });
    } catch (error) {
      console.error("searchUsers error:", error);
      toast.error("Search failed");
      set({ searchResults: [] });
    } finally {
      set({ loadingSearch: false });
    }
  },

  // ---------------- FOLLOW USER ----------------
  followUser: async (userId) => {
    try {
      const res = await axiosInstance.post("/social/follow", { userIdToFollow: userId });
      toast.success(res.data.message);

      // Update following list in store
      set((state) => ({
        following: [...state.following.filter(u => u._id !== userId), res.data.user],
      }));

      // Also update searchResults if user is there....
      set((state) => ({
        searchResults: state.searchResults.map(u =>
          u._id === userId ? { ...u, isFollowing: true, followersCount: res.data.followersCount } : u
        ),
      }));
    } catch (error) {
      console.error("followUser error:", error);
      toast.error(error.response?.data?.message || "Follow failed");
    }
  },

  // ---------------- UNFOLLOW USER ----------------
  unfollowUser: async (userId) => {
    try {
      const res = await axiosInstance.delete(`/social/unfollow/${userId}`);
      toast.success(res.data.message);

      // Remove from following list
      set((state) => ({
        following: state.following.filter(u => u._id !== userId),
      }));

      // Also update searchResults if user is there
      set((state) => ({
        searchResults: state.searchResults.map(u =>
          u._id === userId ? { ...u, isFollowing: false, followersCount: res.data.followersCount } : u
        ),
      }));
    } catch (error) {
      console.error("unfollowUser error:", error);
      toast.error(error.response?.data?.message || "Unfollow failed");
    }
  },
}));

export default useSocialStore;
