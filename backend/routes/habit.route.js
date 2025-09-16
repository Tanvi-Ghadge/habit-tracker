import express from "express";
import {
  createHabit,
  getHabits,
  updateHabit,
  deleteHabit,
  checkInHabit,
  getHabitProgress
} from "../controllers/habit.controller.js";

import { protectRoute } from "../middleware/auth.middleware.js";

const habitrouter = express.Router();
habitrouter.post("/", protectRoute, createHabit);
habitrouter.get("/", protectRoute, getHabits);
habitrouter.put("/:id", protectRoute, updateHabit);
habitrouter.delete("/:id", protectRoute, deleteHabit);
habitrouter.post("/checkin", protectRoute, checkInHabit);
habitrouter.get("/:id/progress", protectRoute, getHabitProgress);

export default habitrouter;
