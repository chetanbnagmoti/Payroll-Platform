import db from "../db.js";
import { nanoid } from "nanoid";

const Payroll = {
  create(payload) {
    const record = Object.assign({}, payload, {
      id: nanoid(),
      createdAt: new Date().toISOString(),
    });
    db.read();
    db.data.payrolls.push(record);
    db.write();
    return record;
  },
  findAll() {
    db.read();
    return db.data.payrolls;
  },
  findById(id) {
    db.read();
    return db.data.payrolls.find((p) => p.id === id) || null;
  },
  update(id, updates) {
    db.read();
    const idx = db.data.payrolls.findIndex((p) => p.id === id);
    if (idx === -1) return null;
    db.data.payrolls[idx] = Object.assign({}, db.data.payrolls[idx], updates, {
      updatedAt: new Date().toISOString(),
    });
    db.write();
    return db.data.payrolls[idx];
  },
  remove(id) {
    db.read();
    const idx = db.data.payrolls.findIndex((p) => p.id === id);
    if (idx === -1) return false;
    db.data.payrolls.splice(idx, 1);
    db.write();
    return true;
  },
  clearAll() {
    db.read();
    db.data.payrolls = [];
    db.write();
  },
};

export default Payroll;
