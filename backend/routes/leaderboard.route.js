import express from "express";
import { getLeaderboard } from "../controllers/leaderboard.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const leaderboardRouter = express.Router();

// Leaderboard Route
leaderboardRouter.get("/leaderboard", protectRoute, getLeaderboard);

export default leaderboardRouter;
