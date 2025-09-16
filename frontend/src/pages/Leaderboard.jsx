import React, { useEffect } from "react";
import { useleaderboardStore } from "../store/useleaderboardstore";
import HamburgerMenu from "../components/Hamburger";

const Leaderboard = () => {
  const { leaderboard, loading, error, fetchLeaderboard } = useleaderboardStore();

  useEffect(() => {
    fetchLeaderboard();
  }, [fetchLeaderboard]);

  return (
    <div className="p-6 max-w-3xl mx-auto pt-32">
        <HamburgerMenu/>
      <h1 className="text-3xl font-bold mb-6 text-center text-emerald-700">
        🏆 Leaderboard
      </h1>

      {loading && <p className="text-gray-500 text-center">Loading leaderboard...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {!loading && !error && leaderboard?.length === 0 && (
        <p className="text-gray-500 text-center">No users to display yet.</p>
      )}

      {!loading && !error && leaderboard?.length > 0 && (
        <ul className="space-y-4">
          {leaderboard.map((user, index) => (
            <li
              key={user._id}
              className="flex justify-between items-center p-4 rounded-lg bg-emerald-50 hover:bg-emerald-100 transition"
            >
              <span className="font-medium">
                {index + 1}. {user.username}
              </span>
              <span className="text-sm text-gray-700">
                🔥 Streak: {user.totalStreak || 0}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Leaderboard;
