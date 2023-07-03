import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import mongoose from "mongoose";
import cookieSession from "cookie-session";
import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signupRouter } from "./routes/signup";
import { signoutRouter } from "./routes/signout";
import { errorHandler } from "./middlewares/error-hadler";
import { NotFoundError } from "./errors/not-found-error";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);

app.use([currentUserRouter, signinRouter, signupRouter, signoutRouter]);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
  /**
   * kubectl create secret generic jwt-secret –from-literal=JWT_KEY=asdf
   * kubectl create secret generic [secret-name] –from-literal=[key]=[value]
   */
  if (!process.env.JWT_KEY) throw new Error("JWT_KEY must be defined");

  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth", {});
  } catch (error) {
    console.log(error);
  }

  app.listen(3000, () => {
    console.log("listening on port 3000");
  });
};

start();
