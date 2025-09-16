import React, { useEffect, useState } from "react";
import useSocialStore from "../store/usesocialstore";
import { toast } from "react-toastify";
import HamburgerMenu from "../components/Hamburger";

const SocialPage = () => {
  const {
    feed,
    following,
    searchResults,
    fetchFeed,
    fetchFollowing,
    followUser,
    unfollowUser,
    searchUsers,
    loadingFeed,
    loadingFollowing,
    loadingSearch,
  } = useSocialStore();

  const [query, setQuery] = useState("");

  // ✅ Fetch feed + following on mount
  useEffect(() => {
    fetchFeed();
    fetchFollowing();
  }, [fetchFeed, fetchFollowing]);

  const handleFollow = async (userId) => {
    await followUser(userId);
  };

  const handleUnfollow = async (userId) => {
    await unfollowUser(userId);
  };

  const handleSearch = () => {
    if (!query.trim()) return toast.warning("Enter a search term");
    searchUsers(query);
  };

  const isFollowing = (userId) => following.some((u) => u._id === userId);

  return (
    <div className="container mx-auto px-6 py-10 space-y-10 pt-32">
      <HamburgerMenu />
      <h1 className="text-3xl font-bold text-emerald-700 text-center mb-6">
        Social Feed 🌐
      </h1>

      {/* Search Users */}
      <div className="flex gap-3 justify-center mb-6">
        <input
          type="text"
          placeholder="Search users..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border rounded-lg px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />
        <button
          onClick={handleSearch}
          className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600"
        >
          Search
        </button>
      </div>

      {/* Search Results */}
      {loadingSearch && <p className="text-gray-500 text-center">Searching...</p>}
      {!loadingSearch && searchResults.length > 0 && (
        <div className="bg-white p-4 rounded-xl shadow-md mb-6">
          <h2 className="font-semibold mb-2">Search Results:</h2>
          {searchResults.map((user) => (
            <div
              key={user._id}
              className="flex justify-between items-center mb-2"
            >
              <span>
                {user.username} ({user.email})
              </span>
              {isFollowing(user._id) ? (
                <button
                  onClick={() => handleUnfollow(user._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 text-sm"
                >
                  Unfollow
                </button>
              ) : (
                <button
                  onClick={() => handleFollow(user._id)}
                  className="bg-emerald-500 text-white px-3 py-1 rounded-lg hover:bg-emerald-600 text-sm"
                >
                  Follow
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Feed */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-emerald-700 mb-2">
          Friend's Activity Feed
        </h2>

        {loadingFeed && <p className="text-gray-500">Loading feed...</p>}

        {!loadingFeed && (!Array.isArray(feed) || feed.length === 0) && (
          <p className="text-gray-500">No activity yet.</p>
        )}

        {Array.isArray(feed) &&
          feed.map((checkIn) => (
            <div key={checkIn._id} className="bg-white p-4 rounded-xl shadow-md">
              <p>
                <strong>{checkIn.user?.username || "Unknown User"}</strong> checked
                in for <strong>{checkIn.habit?.name || "Unknown Habit"}</strong>{" "}
                ({checkIn.habit?.frequency || "N/A"})
              </p>
              <p className="text-sm text-gray-500">
                {checkIn.createdAt
                  ? new Date(checkIn.createdAt).toLocaleString()
                  : "Date not available"}
              </p>
            </div>
          ))}
      </div>

      {/* Following List */}
      <div className="space-y-4 mt-10">
        <h2 className="text-xl font-semibold text-emerald-700 mb-2">
          Following
        </h2>
        {loadingFollowing && <p className="text-gray-500">Loading following...</p>}
        {!loadingFollowing && following.length === 0 && (
          <p className="text-gray-500">You are not following anyone yet.</p>
        )}
        {following.map((user) => (
          <div key={user._id} className="bg-white p-4 rounded-xl shadow-md flex justify-between items-center">
            <span>
              {user.username} ({user.email})
            </span>
            <button
              onClick={() => handleUnfollow(user._id)}
              className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 text-sm"
            >
              Unfollow
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SocialPage;
