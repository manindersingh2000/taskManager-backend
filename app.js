import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./Routes/userRoutes.js";
import taskRoutes from "./Routes/taskRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT;
const MONGOURL = process.env.MONGOURL;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

userRoutes(app);
taskRoutes(app)
app.listen(PORT, (req, res) => {
  mongoose.connect(MONGOURL).then(() => console.log("Connected!"));
});









