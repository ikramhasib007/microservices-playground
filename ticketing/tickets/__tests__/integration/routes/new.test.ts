import request from "supertest";
import { app } from "../../../src/app";
import { Ticket } from "../../../src/models/ticket";
import { natsWrapper } from "../../../src/nats-wrapper";

it("has a route handler listening to /api/tickets for post requests", async () => {
  const response = await request(app).post("/api/tickets").send({});
  expect(response.statusCode).not.toEqual(404);
});

it("should only be accessed if the user is signed in", async () => {
  await request(app).post("/api/tickets").send({}).expect(401);
});

it("should returns a status other than 401 if the user is signed in", async () => {
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", getCookie())
    .send({});
  expect(response.statusCode).not.toEqual(404);
});

it("should returns an error if an invalid title is provided", async () => {
  await request(app)
    .post("/api/tickets")
    .set("Cookie", getCookie())
    .send({
      title: "",
      price: 20,
    })
    .expect(400);

  await request(app)
    .post("/api/tickets")
    .set("Cookie", getCookie())
    .send({
      price: 20,
    })
    .expect(400);
});

it("should returns an error if an invalid price is provided", async () => {
  await request(app)
    .post("/api/tickets")
    .set("Cookie", getCookie())
    .send({
      title: "sfaesd",
      price: -20,
    })
    .expect(400);

  await request(app)
    .post("/api/tickets")
    .set("Cookie", getCookie())
    .send({
      title: "sfaesd",
    })
    .expect(400);
});

it("should creates a ticket with valid inputs", async () => {
  let tickets = await Ticket.find({});
  expect(tickets.length).toEqual(0);

  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", getCookie())
    .send({
      title: "Apocalypto",
      price: 200,
    })
    .expect(201);
  tickets = await Ticket.find({});
  expect(tickets.length).toEqual(1);
  expect(tickets[0].title).toBe("Apocalypto");
  expect(tickets[0].price).toBe(200);
});

it("Should published an event", async () => {
  await request(app)
    .post("/api/tickets")
    .set("Cookie", getCookie())
    .send({
      title: "Apocalypto",
      price: 200,
    })
    .expect(201);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
