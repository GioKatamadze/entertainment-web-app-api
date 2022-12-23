import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import moviesRouter from "./routers/movies-router.js";

const app = express();
app.use(cors());
dotenv.config();

app.use(express.json());

app.use("/api", moviesRouter);

app.listen(process.env.PORT || 3000);
