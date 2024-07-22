// import all required packages
import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cookieSession from "cookie-session";
import passport from "passport";
import cros from "cors";
import passportSetup from "./passport";

import authroute from "../routes/auth";

// declare all required function and variables
dotenv.config();
const app = express();

// Initializes  all requried fields
app.use(
  cookieSession({
    name: "session",
    keys: ["cyberwolve"],
    maxAge: 24 * 60 * 60 * 100,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cros({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use("/auth", authroute);

// sample url's
app.get("/", (request: Request, response: Response) => {
  response.status(200).send("Jaya Shree Raama");
});

// serve the server
const PORT = process.env.PORT || 8080;
app
  .listen(PORT, () => {
    console.log("Server running at PORT: ", PORT);
  })
  .on("error", (error) => {
    throw new Error(error.message);
  });
