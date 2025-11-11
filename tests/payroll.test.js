import request from "supertest";
import app from "../src/index.js";
import db from "../src/db.js";

beforeEach(() => {
  // reset DB
  db.read();
  db.data.payrolls = [];
  db.data.users = [
    { id: "admin-1", username: "admin", password: "adminpass", role: "admin" },
    {
      id: "emp-1",
      username: "alice",
      password: "alicepass",
      role: "employee",
      employeeId: "E001",
    },
  ];
  db.write();
});

describe("Payroll CRUD and net pay", () => {
  let adminToken;
  beforeEach(async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({ username: "admin", password: "adminpass" });
    adminToken = res.body.token;
  });

  test("create -> list -> get -> update -> delete", async () => {
    const payload = {
      employee_id: "E100",
      name: "Bob",
      department: "Eng",
      salary: 5000,
      bonus: 200,
      deductions: 100,
    };
    const createRes = await request(app)
      .post("/payrolls")
      .set("Authorization", `Bearer ${adminToken}`)
      .send(payload);
    expect(createRes.status).toBe(201);
    const id = createRes.body.data.id;

    const listRes = await request(app)
      .get("/payrolls")
      .set("Authorization", `Bearer ${adminToken}`);
    expect(listRes.status).toBe(200);
    expect(listRes.body.data.length).toBe(1);

    const getRes = await request(app)
      .get(`/payrolls/${id}`)
      .set("Authorization", `Bearer ${adminToken}`);
    expect(getRes.status).toBe(200);
    expect(getRes.body.data.name).toBe("Bob");

    const updRes = await request(app)
      .put(`/payrolls/${id}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ department: "Sales" });
    expect(updRes.status).toBe(200);
    expect(updRes.body.data.department).toBe("Sales");

    const delRes = await request(app)
      .delete(`/payrolls/${id}`)
      .set("Authorization", `Bearer ${adminToken}`);
    expect(delRes.status).toBe(204);
  });

  test("net pay calculation (ad-hoc)", async () => {
    const body = { salary: 1000, bonus: 100, deductions: 50 };
    const res = await request(app)
      .post("/payrolls/net")
      .set("Authorization", `Bearer ${adminToken}`)
      .send(body);
    expect(res.status).toBe(200);
    expect(res.body.data.net).toBeDefined();
  });
});
