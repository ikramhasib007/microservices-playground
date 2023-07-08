import request from "supertest";
import { app } from "../../../src/app";

describe("Current user", () => {
  it("should responds with details about the current user", async () => {
    const authResponse = await request(app)
      .post("/api/users/signup")
      .send({
        email: "test@test.com",
        password: "password",
      })
      .expect(201);
    const cookie = authResponse.get("Set-Cookie");

    const response = await request(app)
      .get("/api/users/current-user")
      .set("Cookie", cookie)
      .send()
      .expect(200);
    expect(response.body.currentUser).not.toBeNull();
    expect(response.body.currentUser.id).toBeTruthy();
  });
});
