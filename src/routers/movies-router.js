import getAllMovies from "../controllers/movies-controller.js";
import express from "express";

const moviesRouter = express.Router();

moviesRouter.get("/movies", getAllMovies);

export default moviesRouter;
