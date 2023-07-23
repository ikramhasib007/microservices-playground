import nats, { Message } from "node-nats-streaming";
import { randomBytes } from "crypto";

console.clear();

const stan = nats.connect("ticketing", randomBytes(4).toString("hex"), {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("Listener connected to NATS");

  stan.on("close", () => {
    console.log("NATS connection closed!");
    process.exit();
  });

  const options = stan.subscriptionOptions().setManualAckMode(true);
  const subscription = stan.subscribe(
    "ticket:created",
    "orders-service-queue-group",
    options
  );

  subscription.on("message", (msg: Message) => {
    const data = msg.getData();

    if (typeof data === "string") {
      console.log(`Received event #${msg.getSequence()}, with data: ${data}`);
    }

    msg.ack();
  });
});

// Pressing CTRL+C or Close the terminal
process.on("SIGINT", () => stan.close());
process.on("SIGTERM", () => stan.close());

/**
 * MONITORING
 * For monitoring the streaming server, please check out the k8s and nats service port and then
 * forward the port using `kubectl port-forward [nats-pod-id] PORT:PORT`
 * Then hit the url:
 * http://localhost:PORT/streaming
 * Details about the streaming service
 * http://localhost:PORT/streaming/channelsz?subs=1
 * Here subs = 1 means, the position of the channel list (list count starts from 1)
 * Check out channel list:
 * http://localhost:8222/streaming/channelsz
 */
