import User from "../modals/users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorObj, successObj } from "../config/settings.js";

export const postUser = async (req, res) => {
  const { name, email, password, confirmpassword, role } = req.body;
  console.log(req.body);
  try {
    if (password != confirmpassword) {
      res.status(500).json({ ...errorObj, message: "password do not match" });
      return;
    }
    const existinguser = await User.findOne({ email: email });
    if (existinguser) {
      res.status(500).json({ ...errorObj, message: "Email already exists." });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 8);
    const userObj = {
      name,
      email,
      password: hashedPassword,
      role
    };
    const newUser = new User(userObj);
    await newUser.save();
    res.json({ ...successObj, message: "User added successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ...errorObj, message: "Error adding user." });
  }
};
export const getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};


export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  const isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    const payload = {
      id: user._id,
      name: user.name,
      email: user.email,
    };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRATION_TIME },
      (err, token) => {
        if (err) {
          return res.status(500).json({ message: "Server error" });
        }
        return res.json({
          ...successObj,
          message: "Login successful",
          token: token,
          payload
        });
      }
    );
  }
};