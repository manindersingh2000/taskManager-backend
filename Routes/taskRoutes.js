import {
    createTask,
    getTasks,
    updateTask,
    deleteTask,
  } from "../controller/taskController.js";
  export default (app) => {
    app.post("/", createTask);
    app.get("/", getTasks);
    app.patch("/:id", updateTask);
    app.delete("/:id", deleteTask);
  };