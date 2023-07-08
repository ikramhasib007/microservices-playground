import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../src/app";

declare global {
  var getCookie: () => Promise<string[]>;
}

let mongo: any;

beforeAll(async () => {
  process.env.JWT_KEY = "safjlkfdsa";

  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});

global.getCookie = async () => {
  const email = "test@test.com";
  const password = "password";

  const authResponse = await request(app)
    .post("/api/users/signup")
    .send({
      email,
      password,
    })
    .expect(201);
  expect(authResponse.body.email).toEqual(email);
  expect(authResponse.body.id).toBeTruthy();

  const cookie = authResponse.get("Set-Cookie");
  return cookie;
};
