import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

import moviesRouter from "./routers/movies-router.js";
import usersRouter from "./routers/users-router.js";

const app = express();
app.use(cors());
dotenv.config();

app.use(bodyParser.json());

app.use("/api", usersRouter);
app.use("/api", moviesRouter);

app.listen(process.env.PORT || 3000);
