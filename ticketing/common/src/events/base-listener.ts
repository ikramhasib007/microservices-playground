import { Message, Stan } from "node-nats-streaming";
import { Subjects } from "./subjects";

interface Event {
  subject: Subjects;
  data: any;
}

export abstract class Listener<T extends Event> {
  abstract subject: T["subject"];
  abstract queueGroupName: string;
  abstract onMessage(data: T["data"], msg: Message): void;
  protected ackWait = 5 * 1000; // 5 sec

  constructor(private client: Stan) {}

  subscriptionOptions() {
    return this.client
      .subscriptionOptions()
      .setDeliverAllAvailable() // Get all events that emitted on past
      .setManualAckMode(true)
      .setAckWait(this.ackWait)
      .setDurableName(this.queueGroupName); // Keep a track of all event that's are proccessed or not with status/note
  }

  listen() {
    const subscription = this.client.subscribe(
      this.subject,
      this.queueGroupName, // Do not accidently dump the durable events when services restarts. And make sure all event should go at a specific group of listener
      this.subscriptionOptions()
    );

    subscription.on("message", (msg: Message) => {
      console.log(`Message received: ${this.subject} / ${this.queueGroupName}`);

      const parsedData = this.parseMessage(msg);
      this.onMessage(parsedData, msg);
    });
  }

  parseMessage(msg: Message) {
    const data = msg.getData();
    return typeof data === "string"
      ? JSON.parse(data)
      : JSON.parse(data.toString("utf8"));
  }
}
