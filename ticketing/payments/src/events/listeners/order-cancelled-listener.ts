import { Message } from "node-nats-streaming";
import {
  Listener,
  Subjects,
  OrderCancelledEvent,
  OrderStatus,
} from "@concat7/common";
import { queueGroupName } from "./queue-group-name";
import { Order } from "../../models/order";

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  readonly subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
  queueGroupName: string = queueGroupName;

  async onMessage(data: OrderCancelledEvent["data"], msg: Message) {
    const order = await Order.findByEvent(data);

    // If no order, throw an error
    if (!order) throw new Error("Order not found!");

    // Mark the order as being reserve cancelled
    order.set({ status: OrderStatus.Cancelled });

    // Save the order
    await order.save();

    // Act the message
    msg.ack();
  }
}
