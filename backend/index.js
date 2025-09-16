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
  "https://habit-tracker-cy57.vercel.app",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps, Postman)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed for origin: " + origin));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // allow all methods
    credentials: true, // allow cookies
  })
);

// Routes
app.use("/api/auth", authrouter);
app.use("/api/habit", habitrouter);
app.use("/api/social", socialrouter);
app.use("/api/game", leaderboardRouter);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server is running on PORT: " + PORT);
  connectdb();
});
