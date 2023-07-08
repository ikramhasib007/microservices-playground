import request from "supertest";
import { app } from "../../../src/app";

describe("Current user", () => {
  it("should responds with details about the current user", async () => {
    const cookie = await getCookie();

    const response = await request(app)
      .get("/api/users/current-user")
      .set("Cookie", cookie)
      .send()
      .expect(200);
    expect(response.body.currentUser).not.toBeNull();
    expect(response.body.currentUser.id).toBeTruthy();
  });

  it("should responds with null when not authenticated", async () => {
    const response = await request(app)
      .get("/api/users/current-user")
      .send()
      .expect(200);
    expect(response.body.currentUser).toBeNull();
  });
});
