import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import moviesRouter from "./routers/movies-router.js";
import bodyParser from "body-parser";

const app = express();
app.use(cors());
dotenv.config();

app.use(bodyParser.json());

app.use("/api", moviesRouter);

app.listen(process.env.PORT || 3000);
