import GetAllMovies from "../controllers/movies-controller.js";
import express from "express";

const moviesRouter = express.Router();

moviesRouter.get("/movies", GetAllMovies);

export default moviesRouter;
