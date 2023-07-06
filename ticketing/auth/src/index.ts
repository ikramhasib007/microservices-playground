import mongoose from "mongoose";
import { app } from "./app";

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
