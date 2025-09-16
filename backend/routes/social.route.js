import express from "express";
import {
  followUser,
  unfollowUser,
  searchUsers,
  getFeed,
  getFollowing
} from "../controllers/social.controller.js";

import { protectRoute } from "../middleware/auth.middleware.js";

const socialrouter = express.Router();
socialrouter.post("/follow", protectRoute, followUser);
socialrouter.get("/following", protectRoute, getFollowing);
socialrouter.delete("/unfollow/:userId", protectRoute, unfollowUser);
socialrouter.get("/search", protectRoute, searchUsers);
socialrouter.get("/feed", protectRoute, getFeed);

export default socialrouter;
