import express from "express"
import { checkauth, login, logout, signup } from "../controllers/auth.controller.js"
import { protectRoute } from "../middleware/auth.middleware.js"
const authrouter=express.Router()
authrouter.post("/signup",signup)
authrouter.post("/login",login)
authrouter.post("/logout",logout)
authrouter.get("/check",protectRoute,checkauth)

export default authrouter