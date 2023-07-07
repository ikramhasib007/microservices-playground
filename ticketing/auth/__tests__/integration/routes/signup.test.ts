import request from "supertest";
import { app } from "../../../src/app";

describe("Signup", () => {
  it("Should returns a 201 on successful signup", async () => {
    return request(app)
      .post("/api/users/signup")
      .send({
        email: "ikramhasib007@gmail.com",
        password: "12345678",
      })
      .expect(201);
  });
});
