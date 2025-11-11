import request from "supertest";
import app from "../src/index.js";
import db from "../src/db.js";

beforeEach(() => {
  db.read();
  db.data.users = [
    { id: "admin-1", username: "admin", password: "adminpass", role: "admin" },
  ];
  db.write();
});

describe("Auth", () => {
  test("login success", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({ username: "admin", password: "adminpass" });
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  test("login fail", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({ username: "admin", password: "wrong" });
    expect(res.status).toBe(401);
  });
});
