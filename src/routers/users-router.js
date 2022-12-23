import getAllUsers from "../controllers/users-controller.js";
import express from "express";

const usersRouter = express.Router();

usersRouter.get("/users", getAllUsers);

export default usersRouter;
