import { postUser, getUsers, login } from "../controller/userController.js";
export default (app) => {
  app.post("/login", login);
  app.post("/signup", postUser);
  app.get("/users", getUsers);
};