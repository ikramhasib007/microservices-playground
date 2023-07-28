import request from "supertest";
import { app } from "../../../src/app";
import { Ticket } from "../../../src/models/ticket";
import { Order, OrderStatus } from "../../../src/models/order";
import { natsWrapper } from "../../../src/nats-wrapper";

it("Shouldn't delete an order when provide invalid orderID", async () => {
  const response = await request(app)
    .delete(`/api/orders/sasfjoid`)
    .set("Cookie", getCookie())
    .send()
    .expect(400);
  expect(response.body.errors[0].message).toEqual("OrderID is invalid");
});

it("Should marks an order as cancelled", async () => {
  // create a ticket with Ticket Model
  const ticket = Ticket.build({
    title: "concert",
    price: 20,
  });
  await ticket.save();

  const user = getCookie();
  // make a request to create an order
  const { body: order } = await request(app)
    .post("/api/orders")
    .set("Cookie", user)
    .send({ ticketId: ticket.id })
    .expect(201);

  // make a request to cancel the order
  await request(app)
    .delete(`/api/orders/${order.id}`)
    .set("Cookie", user)
    .send()
    .expect(204);

  // expectation to make sure the thing is cancelled
  const updatedOrder = await Order.findById(order.id);

  expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
});

it("Should emits a order cancelled event", async () => {
  // create a ticket with Ticket Model
  const ticket = Ticket.build({
    title: "concert",
    price: 20,
  });
  await ticket.save();

  const user = getCookie();
  // make a request to create an order
  const { body: order } = await request(app)
    .post("/api/orders")
    .set("Cookie", user)
    .send({ ticketId: ticket.id })
    .expect(201);

  // make a request to cancel the order
  await request(app)
    .delete(`/api/orders/${order.id}`)
    .set("Cookie", user)
    .send()
    .expect(204);
  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
