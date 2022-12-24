import { getAllUsers, postUser } from "../controllers/users-controller.js";
import express from "express";

const usersRouter = express.Router();

usersRouter.get("/users", getAllUsers);
usersRouter.post("/user", postUser);

export default usersRouter;
