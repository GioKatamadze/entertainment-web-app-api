import {
  getAllUsers,
  signUp,
  signIn,
} from "../controllers/users-controller.js";
import express from "express";

const usersRouter = express.Router();

usersRouter.post("/auth/signup", signUp);
usersRouter.post("/auth/signin", signIn);
usersRouter.get("/users", getAllUsers);

export default usersRouter;
