import {
  getAllUsers,
  signUp,
  signIn,
} from "../controllers/users-controller.js";
import express from "express";

const usersRouter = express.Router();

usersRouter.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

usersRouter.post("/auth/signup", signUp);
usersRouter.post("/auth/signin", signIn);
usersRouter.get("/users", getAllUsers);

export default usersRouter;
