import mongoose from "mongoose";
import { app } from "./app";
import { natsWrapper } from "./nats-wrapper";

const start = async () => {
  /**
   * kubectl create secret generic jwt-secret --from-literal=JWT_KEY=FA1F4D77A673182FD463323D25DBD
   * kubectl create secret generic [secret-name] --from-literal=[key]=[value]
   */
  if (!process.env.JWT_KEY) throw new Error("JWT_KEY must be defined");
  if (!process.env.MONGO_URI) throw new Error("MONGO_URI must be defined");

  if (!process.env.NATS_CLUSTERID)
    throw new Error("NATS_CLUSTERID must be defined");
  if (!process.env.NATS_URL) throw new Error("NATS_URL must be defined");

  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTERID,
      "sdfjsiuoi987",
      process.env.NATS_URL
    );
    await mongoose.connect(process.env.MONGO_URI, {});
    console.log("MongoDB connected!");
  } catch (error) {
    console.log(error);
  }

  app.listen(3000, () => {
    console.log("listening on port 3000");
  });
};

start();

/**
 * kubectl create secret generic db-secret --from-literal=MONGO_INITDB_ROOT_USERNAME=admin
 * kubectl create secret generic db-secret --from-literal=MONGO_INITDB_ROOT_PASSWORD=1234
 *
 * kubectl create secret generic db-secret --from-literal=MONGO_INITDB_ROOT_USERNAME=admin --from-literal=MONGO_INITDB_ROOT_PASSWORD=1234
 */
