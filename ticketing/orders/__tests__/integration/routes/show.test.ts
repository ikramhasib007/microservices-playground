import request from "supertest";
import mongoose from "mongoose";
import { app } from "../../../src/app";
import { Ticket } from "../../../src/models/ticket";

it("Shouldn't fetches the order when provide invalid orderID", async () => {
  const response = await request(app)
    .get(`/api/orders/sasfjoid`)
    .set("Cookie", getCookie())
    .send()
    .expect(400);
  expect(response.body.errors[0].message).toEqual("OrderID is invalid");
});

it("Should fetches the order", async () => {
  // Create a ticket
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: "concert",
    price: 20,
  });
  await ticket.save();

  const user = getCookie();
  // make a request to build an order with this ticket
  const { body: order } = await request(app)
    .post("/api/orders")
    .set("Cookie", user)
    .send({ ticketId: ticket.id })
    .expect(201);

  // make request to fetch the order
  const { body: fetchedOrder } = await request(app)
    .get(`/api/orders/${order.id}`)
    .set("Cookie", user)
    .send()
    .expect(200);

  expect(fetchedOrder.id).toEqual(order.id);
});

it("Should returns an error if one user tries to fetch another users order", async () => {
  // Create a ticket
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: "concert",
    price: 20,
  });
  await ticket.save();

  const user = getCookie();
  // make a request to build an order with this ticket
  const { body: order } = await request(app)
    .post("/api/orders")
    .set("Cookie", user)
    .send({ ticketId: ticket.id })
    .expect(201);

  // make request to fetch the order
  await request(app)
    .get(`/api/orders/${order.id}`)
    .set("Cookie", getCookie())
    .send()
    .expect(401);
});
