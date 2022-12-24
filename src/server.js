import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

import moviesRouter from "./routers/movies-router.js";
import usersRouter from "./routers/users-router.js";
import swaggerMiddleware from "./middlewares/swagger-middleware.js";

const app = express();
dotenv.config();
app.use(cors());

app.use(bodyParser.json());
app.use("/images", express.static("public/storage"));

app.use("/api", usersRouter);
app.use("/api", moviesRouter);
app.use("/", ...swaggerMiddleware());

app.listen(process.env.PORT || 5000);
