import mongoose from "mongoose";
import request from "supertest";
import { OrderStatus } from "@concat7/common";
import { app } from "../../../src/app";
import { Order } from "../../../src/models/order";

it("should returns a 404 when purchasing an order that does not exist", async () => {
  await request(app)
    .post("/api/payments")
    .set("Cookie", getCookie())
    .send({
      token: "randomstripetoken",
      orderId: new mongoose.Types.ObjectId().toHexString(),
    })
    .expect(404);
});

it("should returns a 400 when purchasing an order without the payload", async () => {
  await request(app)
    .post("/api/payments")
    .set("Cookie", getCookie())
    .send({
      orderId: new mongoose.Types.ObjectId().toHexString(),
    })
    .expect(400);

  await request(app)
    .post("/api/payments")
    .set("Cookie", getCookie())
    .send({
      token: "randomstripetoken",
    })
    .expect(400);

  await request(app)
    .post("/api/payments")
    .set("Cookie", getCookie())
    .send({})
    .expect(400);
});

it("should returns a 401 when purchasing an order that doesn't belong to the user", async () => {
  const order = Order.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    userId: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    price: 20,
    status: OrderStatus.Created,
  });
  await order.save();

  await request(app)
    .post("/api/payments")
    .set("Cookie", getCookie())
    .send({
      token: "randomstripetoken",
      orderId: order.id,
    })
    .expect(401);
});

it("should returns a 400 when purchasing a cancelled order", async () => {
  const userId = new mongoose.Types.ObjectId().toHexString();
  const order = Order.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    userId,
    version: 0,
    price: 20,
    status: OrderStatus.Cancelled,
  });
  await order.save();

  await request(app)
    .post("/api/payments")
    .set("Cookie", getCookie(userId))
    .send({
      orderId: order.id,
      token: "randomstripetoken",
    })
    .expect(400);
});
