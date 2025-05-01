import mongoose from "mongoose";
const taskSchema = new mongoose.Schema(
  {
    taskname: { type: String, required: true },
    tag: { type: String, required: true },
    time: { type: String, required: true },
  },
  { timestamps: true }
);
const Task = mongoose.model("Task", taskSchema);
export default Task;
