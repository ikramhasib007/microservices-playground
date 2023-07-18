import request from "supertest";
import { app } from "../../../src/app";

const createTicket = () => {
  return request(app).post("/api/tickets").set("Cookie", getCookie()).send({
    title: "new ticket title",
    price: 20,
  });
};

it("Should fetch a list of tickets", async () => {
  await createTicket();
  await createTicket();
  await createTicket();

  const response = await request(app).get("/api/tickets").send().expect(200);

  expect(response.body.length).toBe(3);
});
