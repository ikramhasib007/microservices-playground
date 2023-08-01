import { OrderCreatedListener } from "./events/listeners/order-created-listener";
import { natsWrapper } from "./nats-wrapper";

const start = async () => {
  /**
   * kubectl create secret generic jwt-secret --from-literal=JWT_KEY=FA1F4D77A673182FD463323D25DBD
   * kubectl create secret generic [secret-name] --from-literal=[key]=[value]
   */

  if (!process.env.NATS_CLUSTERID)
    throw new Error("NATS_CLUSTERID must be defined");
  if (!process.env.NATS_CLIENTID)
    throw new Error("NATS_CLIENTID must be defined");
  if (!process.env.NATS_URL) throw new Error("NATS_URL must be defined");

  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTERID,
      process.env.NATS_CLIENTID,
      process.env.NATS_URL
    );

    natsWrapper.client.on("close", () => {
      console.log("NATS connection closed!");
      process.exit();
    });

    // Pressing CTRL+C or Close the terminal
    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());

    new OrderCreatedListener(natsWrapper.client).listen();
  } catch (error) {
    console.log(error);
  }
};

start();

/**
 * kubectl create secret generic db-secret --from-literal=MONGO_INITDB_ROOT_USERNAME=admin
 * kubectl create secret generic db-secret --from-literal=MONGO_INITDB_ROOT_PASSWORD=1234
 *
 * kubectl create secret generic db-secret --from-literal=MONGO_INITDB_ROOT_USERNAME=admin --from-literal=MONGO_INITDB_ROOT_PASSWORD=1234
 */
