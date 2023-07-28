import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../../src/app";
import { Ticket } from "../../../src/models/ticket";
import { Order, OrderStatus } from "../../../src/models/order";
import { natsWrapper } from "../../../src/nats-wrapper";

it("Should returns an error if the ticketId is not valid", async () => {
  const response = await request(app)
    .post("/api/orders")
    .set("Cookie", getCookie())
    .send({ ticketId: "fdsare90" })
    .expect(400);
  expect(response.body.errors[0].message).toEqual("TicketId must be provided");
});

it("Should returns an error if the ticket does not exist", async () => {
  const ticketId = new mongoose.Types.ObjectId();
  await request(app)
    .post("/api/orders")
    .set("Cookie", getCookie())
    .send({ ticketId })
    .expect(404);
});

it("Should returns an error if the ticket is already reserved", async () => {
  const ticket = Ticket.build({
    title: "concert",
    price: 20,
  });
  await ticket.save();

  const order = Order.build({
    ticket,
    userId: "neweo9hjnas",
    status: OrderStatus.Created,
    expiresAt: new Date(),
  });
  await order.save();

  await request(app)
    .post("/api/orders")
    .set("Cookie", getCookie())
    .send({ ticketId: ticket.id })
    .expect(400);
});

it("Should reserves a ticket", async () => {
  const ticket = Ticket.build({
    title: "concert",
    price: 20,
  });
  await ticket.save();

  const response = await request(app)
    .post("/api/orders")
    .set("Cookie", getCookie())
    .send({ ticketId: ticket.id })
    .expect(201);
  expect(response.body.status).toEqual(OrderStatus.Created);
});

it("Should emits an order created event", async () => {
  const ticket = Ticket.build({
    title: "concert",
    price: 20,
  });
  await ticket.save();

  const response = await request(app)
    .post("/api/orders")
    .set("Cookie", getCookie())
    .send({ ticketId: ticket.id })
    .expect(201);
  expect(response.body.status).toEqual(OrderStatus.Created);
  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
