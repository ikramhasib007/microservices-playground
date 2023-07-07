import request from "supertest";
import { app } from "../../../src/app";

describe("Signin", () => {
  it("should fails when a email does not exist is supplied", async () => {
    return request(app)
      .post("/api/users/signin")
      .send({
        email: "test@test.com",
        password: "password",
      })
      .expect(400);
  });

  it("should returns a 400 with an invalid email", async () => {
    return request(app)
      .post("/api/users/signin")
      .send({
        email: "asdfdsfasd",
        password: "password",
      })
      .expect(400);
  });

  it("should returns a 400 with an invalid password", async () => {
    return request(app)
      .post("/api/users/signin")
      .send({
        email: "test@test.com",
        password: "p",
      })
      .expect(400);
  });

  it("should returns a 400 with missing email and password", async () => {
    await request(app).post("/api/users/signin").send({}).expect(400);

    const response = await request(app)
      .post("/api/users/signin")
      .send({
        email: "test@test.com",
      })
      .expect(400);

    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          message: "Password can't be empty",
          field: "password",
        }),
      ])
    );

    await request(app)
      .post("/api/users/signin")
      .send({
        password: "password",
      })
      .expect(400);
  });

  it("should fails when an incorrect password is supplied", async () => {
    await request(app)
      .post("/api/users/signup")
      .send({
        email: "test@test.com",
        password: "password",
      })
      .expect(201);

    const response = await request(app)
      .post("/api/users/signin")
      .send({
        email: "test@test.com",
        password: "password123",
      })
      .expect(400);

    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          message: "Unable to signin",
        }),
      ])
    );
  });

  it("should sets a cookie after given valid credentials", async () => {
    await request(app)
      .post("/api/users/signup")
      .send({
        email: "test@test.com",
        password: "password",
      })
      .expect(201);

    const response = await request(app)
      .post("/api/users/signin")
      .send({
        email: "test@test.com",
        password: "password",
      })
      .expect(200);
    expect(response.get("Set-Cookie")).toBeDefined();
  });
});
