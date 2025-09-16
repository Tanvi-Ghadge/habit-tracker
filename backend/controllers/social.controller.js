import mongoose from "mongoose";
import Follow from "../models/Follow.js";
import User from "../models/User.js";
import CheckIn from "../models/CheckIn.js";


// Follow a user
export const followUser = async (req, res) => {
  try {
    const { userIdToFollow } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userIdToFollow))
      return res.status(400).json({ message: "Invalid userId" });

    if (req.user._id.toString() === userIdToFollow)
      return res.status(400).json({ message: "You cannot follow yourself" });

    const userToFollow = await User.findById(userIdToFollow).select(
      "username email"
    );
    if (!userToFollow)
      return res.status(404).json({ message: "User not found" });

    const existing = await Follow.findOne({
      follower: req.user._id,
      following: userIdToFollow,
    });
    if (existing)
      return res.status(400).json({ message: "Already following this user" });

    await new Follow({
      follower: req.user._id,
      following: userIdToFollow,
    }).save();

    const followersCount = await Follow.countDocuments({
      following: userIdToFollow,
    });

    res.status(201).json({
      message: "Followed user successfully",
      isFollowing: true,
      followersCount,
      user: {
        _id: userToFollow._id,
        username: userToFollow.username,
        email: userToFollow.email,
      },
    });
  } catch (error) {
    console.error("followUser error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Unfollow a user
export const unfollowUser = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId))
      return res.status(400).json({ message: "Invalid userId" });

    const user = await User.findById(userId).select("username email");
    if (!user) return res.status(404).json({ message: "User not found" });

    const deleted = await Follow.findOneAndDelete({
      follower: req.user._id,
      following: userId,
    });
    if (!deleted)
      return res.status(400).json({ message: "Not following this user" });

    const followersCount = await Follow.countDocuments({ following: userId });

    res.json({
      message: "Unfollowed successfully",
      isFollowing: false,
      followersCount,
      user: { _id: user._id, username: user.username, email: user.email },
    });
  } catch (error) {
    console.error("unfollowUser error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ----------------- SEARCH USERS -----------------
export const searchUsers = async (req, res) => {
  try {
    const q = (req.query.q || "").trim();
    if (!q) return res.json({ users: [] });

    const regex = new RegExp(q, "i");

    const users = await User.find({
      _id: { $ne: req.user._id },
      $or: [{ username: regex }, { email: regex }],
    }).select("username email");

    const userIds = users.map((u) => u._id);
    const myFollowing = await Follow.find({ follower: req.user._id }).select(
      "following"
    );
    const followingSet = new Set(
      myFollowing.map((f) => f.following.toString())
    );

    const followersAgg = await Follow.aggregate([
      { $match: { following: { $in: userIds } } },
      { $group: { _id: "$following", count: { $sum: 1 } } },
    ]);
    const followersMap = new Map(
      followersAgg.map((r) => [r._id.toString(), r.count])
    );

    const formatted = users.map((u) => ({
      _id: u._id,
      username: u.username,
      email: u.email,
      isFollowing: followingSet.has(u._id.toString()),
      followersCount: followersMap.get(u._id.toString()) || 0,
    }));

    res.json({ users: formatted });
  } catch (error) {
    console.error("searchUsers error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ----------------- SOCIAL FEED -----------------
export const getFeed = async (req, res) => {
  try {
    const followingDocs = await Follow.find({ follower: req.user._id }).select(
      "following"
    );
    const followingIds = followingDocs.map((f) => f.following);

    if (!followingIds.length) return res.json({ feed: [] });

    const recentCheckIns = await CheckIn.find({ user: { $in: followingIds } })
      .populate("habit", "name frequency") // populate habit
      .populate("user", "username email")
      .sort({ createdAt: -1 })
      .limit(20);


    const filteredCheckIns = recentCheckIns.filter((checkIn) => checkIn.habit);

    res.json({ feed: filteredCheckIns });
  } catch (error) {
    console.error("getFeed error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ----------------- GET FOLLOWING LIST -----------------
export const getFollowing = async (req, res) => {
  try {
    const follows = await Follow.find({ follower: req.user._id }).select(
      "following"
    );
    const followingIds = follows.map((f) => f.following);

    if (!followingIds.length) return res.json({ following: [] });

    const users = await User.find({ _id: { $in: followingIds } }).select(
      "username email"
    );

    const followersAgg = await Follow.aggregate([
      { $match: { following: { $in: followingIds } } },
      { $group: { _id: "$following", count: { $sum: 1 } } },
    ]);
    const followersMap = new Map(
      followersAgg.map((r) => [r._id.toString(), r.count])
    );

    const formatted = users.map((u) => ({
      _id: u._id,
      username: u.username,
      email: u.email,
      isFollowing: true,
      followersCount: followersMap.get(u._id.toString()) || 0,
    }));

    res.json({ following: formatted });
  } catch (error) {
    console.error("getFollowing error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
