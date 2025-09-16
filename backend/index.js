import express from "express";
import dotenv from "dotenv";
import connectdb from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import authrouter from "./routes/auth.route.js";
import habitrouter from "./routes/habit.route.js";
import socialrouter from "./routes/social.route.js";
import leaderboardRouter from "./routes/leaderboard.route.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
const allowedOrigins = [
  "habit-tracker-ten-umber.vercel.app",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed for origin: " + origin));
      }
    },
    credentials: true,
  })
);

app.use("/api/auth", authrouter);
app.use("/api/habit", habitrouter);
app.use("/api/social", socialrouter);
app.use("/api/game", leaderboardRouter);
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("server is running on PORT:" + PORT);
  connectdb();
});
