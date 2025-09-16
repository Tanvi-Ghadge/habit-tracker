import { generateToken } from "../lib/token.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs"
const signup = async (req, res) => {
  try {
    const {username , email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "all fields required" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "password should be atleast 6 characters long" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "user already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      username,
      email,
      password: hashedpassword,
    });
    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();

      return res.status(201).json({
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        
        
        createdAt: newUser.createdAt,
      });
    } else {
      return res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const ispassword = await bcrypt.compare(password, user.password);
    if (!ispassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    generateToken(user._id, res);

    return res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      
       
        createdAt: user.createdAt,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
const logout = (req, res) => {
  try {
    res.cookie("jwt", null, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      expires: new Date(0), // Expire the cookie immediately
    });

    res.clearCookie("jwt"); // Ensure removal of cookie

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error in logout controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const checkauth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};



export { login, signup, logout, checkauth };
