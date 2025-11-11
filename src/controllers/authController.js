import db from "../db.js";
import jwt from "jsonwebtoken";

function seedUsers() {
  db.read();
  if (!db.data.users || db.data.users.length === 0) {
    db.data.users = [
      {
        id: "admin-1",
        username: "admin",
        password: "adminpass",
        role: "admin",
      },
      {
        id: "emp-1",
        username: "alice",
        password: "alicepass",
        role: "employee",
        employeeId: "E001",
      },
    ];
    db.write();
  }
}

seedUsers();

const login = (req, res) => {
  const { username, password } = req.body || {};
  db.read();
  const user = db.data.users.find(
    (u) => u.username === username && u.password === password
  );
  if (!user) return res.status(401).json({ error: "invalid credentials" });
  const token = jwt.sign(
    {
      sub: user.id,
      role: user.role,
      username: user.username,
      employeeId: user.employeeId,
    },
    process.env.JWT_SECRET || "devsecret",
    { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
  );
  return res.json({ token });
};

export default login;
