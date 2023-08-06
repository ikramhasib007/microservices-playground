import { Message } from "node-nats-streaming";
import mongoose from "mongoose";
import { OrderCancelledEvent, OrderStatus } from "@concat7/common";
import { natsWrapper } from "../../../nats-wrapper";
import { OrderCancelledListener } from "../order-cancelled-listener";
import { Order } from "../../../models/order";

const setup = async () => {
  // create an instance of the listener
  const listener = new OrderCancelledListener(natsWrapper.client);

  // create an order
  const order = Order.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    price: 20,
    version: 0,
    userId: new mongoose.Types.ObjectId().toHexString(),
    status: OrderStatus.Created,
  });
  await order.save();

  // create a fake data event
  const data: OrderCancelledEvent["data"] = {
    id: order.id,
    version: 1,
    ticket: {
      id: new mongoose.Types.ObjectId().toHexString(),
    },
  };

  // create a fake message object
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, order, data, msg };
};

it("should update order status when order is cancelled", async () => {
  const { listener, data, msg, order } = await setup();

  // call the onMessage function with the data object + message object
  await listener.onMessage(data, msg);

  // write assertions to make sure a ticket was updated with orderId!
  const updatedOrder = await Order.findById(order.id);

  expect(updatedOrder).toBeDefined();
  expect(updatedOrder!.status).toBe(OrderStatus.Cancelled);
});

it("should acks the message", async () => {
  const { listener, data, msg } = await setup();

  // call the onMessage function with the data object + message object
  await listener.onMessage(data, msg);

  // write assertions to make sure ack function is called
  expect(msg.ack).toHaveBeenCalled();
  expect(msg.ack).toHaveBeenCalledTimes(1);
});

it("should'not call ack if the event hasn't found the order", async () => {
  const { msg, data, listener } = await setup();

  data.id = new mongoose.Types.ObjectId().toHexString();

  await expect(listener.onMessage(data, msg)).rejects.toThrow(
    "Order not found!"
  );

  expect(msg.ack).not.toHaveBeenCalled();
});

// it("should publishes a ticket update event", async () => {
//   const { msg, data, listener, orderId } = await setup();

//   await listener.onMessage(data, msg);
//   expect(natsWrapper.client.publish).toHaveBeenCalled();

//   const ticketUpdatedData = JSON.parse(
//     (natsWrapper.client.publish as jest.Mock).mock.calls[0][1]
//   );
//   expect(ticketUpdatedData.orderId).toEqual(undefined);
// });
