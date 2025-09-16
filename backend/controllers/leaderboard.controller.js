import User from "../models/User.js";
import Habit from "../models/Habit.js";

export const getLeaderboard = async (req, res) => {
  try {
    // 1. Get all users
    const users = await User.find().select("username avatar");
    const leaderboard = await Promise.all(
      users.map(async (user) => {
        const habits = await Habit.find({ user: user._id });
        const totalStreak = habits.reduce(
          (sum, habit) => sum + (habit.streak || 0),
          0
        );
        return {
          username: user.username,
          avatar: user.avatar,
          totalStreak,
        };
      })
    );

    leaderboard.sort((a, b) => b.totalStreak - a.totalStreak);
    const top10 = leaderboard.slice(0, 10);

    res.json({ leaderboard: top10 });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
