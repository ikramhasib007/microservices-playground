import mongoose from "mongoose";
import { Message } from "node-nats-streaming";
import { ExpirationCompleteEvent, OrderStatus } from "@concat7/common";
import { natsWrapper } from "../../../nats-wrapper";
import { ExpirationCompleteListener } from "../expiration-complete-listener";
import { Ticket } from "../../../models/ticket";
import { Order } from "../../../models/order";

const setup = async () => {
  // Create a listener
  const listener = new ExpirationCompleteListener(natsWrapper.client);

  // Create and save a ticket
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: "new movie (thor)",
    price: 20,
  });
  await ticket.save();

  // Creating an order
  const order = Order.build({
    status: OrderStatus.Created,
    expiresAt: new Date(),
    userId: new mongoose.Types.ObjectId().toHexString(),
    ticket,
  });
  await order.save();

  // Create a fake data object
  const data: ExpirationCompleteEvent["data"] = {
    orderId: order.id,
  };

  // Create a fake msg object
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  // return all of this stuff
  return { msg, data, order, ticket, listener };
};

it("should finds and updates an order status to cancelled", async () => {
  const { msg, data, order, listener } = await setup();

  await listener.onMessage(data, msg);

  const updatedOrder = await Order.findById(order.id);

  expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
});

it("Should emit and OrderCancelled event", async () => {
  const { msg, data, order, listener } = await setup();
  await listener.onMessage(data, msg);

  expect(natsWrapper.client.publish).toHaveBeenCalled();

  const eventData = JSON.parse(
    (natsWrapper.client.publish as jest.Mock).mock.calls[0][1]
  );
  expect(eventData.id).toEqual(order.id);
});

it("should acks the message", async () => {
  const { msg, data, listener } = await setup();

  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
  expect(msg.ack).toHaveBeenCalledTimes(1);
});

it("should'not call ack if the order isn't found", async () => {
  const { msg, data, listener } = await setup();

  data.orderId = new mongoose.Types.ObjectId().toHexString();

  await expect(listener.onMessage(data, msg)).rejects.toThrow(
    "Order not found!"
  );

  expect(msg.ack).not.toHaveBeenCalled();
});
