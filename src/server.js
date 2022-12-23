import express from "express";
// import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import moviesRouter from "./routers/movies-router.js";

const app = express();
app.use(cors());
dotenv.config();

app.use(express.json());

app.use("/api", moviesRouter);

app.listen(
  "https://entertainment-web-app-api-production.up.railway.app" || 3000
);
