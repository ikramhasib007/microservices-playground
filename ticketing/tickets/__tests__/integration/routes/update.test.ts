import request from "supertest";
import { app } from "../../../src/app";
import mongoose from "mongoose";
import { natsWrapper } from "../../../src/nats-wrapper";

it("Should returns 404 if the provided id does not exist", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .set("Cookie", getCookie())
    .send({
      title: "sfas",
      price: 20,
    })
    .expect(404);
});

it("Should returns a 401 if the user is not authenticated", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .send({
      title: "sfas",
      price: 20,
    })
    .expect(401);
});

it("Should returns a 401 if the user does not own the ticket", async () => {
  const response = await request(app)
    .post(`/api/tickets`)
    .set("Cookie", getCookie()) // every request, there is a new user.
    .send({
      title: "ticket title is here",
      price: 20,
    })
    .expect(201);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", getCookie()) // every request, there is a new user.
    .send({
      title: "UPDATE ticket title is here",
      price: 200,
    })
    .expect(401);
});

it("Should returns a 400 if the user provides an invalid title or price", async () => {
  const cookie = getCookie();
  const response = await request(app)
    .post(`/api/tickets`)
    .set("Cookie", cookie)
    .send({
      title: "ticket title is here",
      price: 20,
    })
    .expect(201);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "",
      price: 200,
    })
    .expect(400);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "ticket title is here",
      price: -200,
    })
    .expect(400);
});

it("Should update the ticket when provided valid inputs", async () => {
  const cookie = getCookie();
  const response = await request(app)
    .post(`/api/tickets`)
    .set("Cookie", cookie)
    .send({
      title: "ticket title is here",
      price: 20,
    })
    .expect(201);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "UPDATE ticket title is here",
      price: 220,
    })
    .expect(200);

  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send();

  expect(ticketResponse.body.title).toEqual("UPDATE ticket title is here");
  expect(ticketResponse.body.price).toEqual(220);
});

it("Should published an event", async () => {
  const cookie = getCookie();
  const response = await request(app)
    .post(`/api/tickets`)
    .set("Cookie", cookie)
    .send({
      title: "ticket title is here",
      price: 20,
    })
    .expect(201);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "UPDATE ticket title is here",
      price: 220,
    })
    .expect(200);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
