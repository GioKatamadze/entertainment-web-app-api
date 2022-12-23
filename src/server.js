import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import moviesRouter from "./routers/movies-router.";

const app = express();

app.use(bodyParser.json());

app.use("/api", cors(), moviesRouter);

app.listen(5000);
