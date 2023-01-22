import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

import moviesRouter from "./routers/movies-router.js";
import usersRouter from "./routers/users-router.js";
import swaggerMiddleware from "./middlewares/swagger-middleware.js";

const users = [
  {
    name: "Giorgi Katamadze",
    password: "42",
    role: "admin",
    email: "Giorgi@gmail.com",
  },
];

const app = express();
dotenv.config();
app.use(cors());

function generateToken(data) {
  return jwt.sign(data, process.env.TOKEN_SECRET, { expiresIn: "1800s" });
}

app.use(bodyParser.json());

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

app.get("/user", authenticateJWT, (req, res) => {
  const { email } = req.user;

  const user = users.find((u) => u.email === email);

  if (user) {
    res.json({
      user: {
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } else {
    res.status(401).send("Account does not exist");
  }
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email && u.password === password);

  if (user) {
    const token = generateToken({
      role: user.role,
      email: user.email,
      name: user.name,
    });

    res.json({
      accessToken: token,
      user: {
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } else {
    res.status(401).send("Username or password incorrect");
  }
});

app.use("/regular", express.static("public/storage/regular"));
app.use("/trending", express.static("public/storage/trending"));

app.use("/api", usersRouter);
app.use("/api", moviesRouter);
app.use("/", ...swaggerMiddleware());

app.listen(process.env.PORT || 5000);
