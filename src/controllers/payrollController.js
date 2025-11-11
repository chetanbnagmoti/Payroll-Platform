import Payroll from "../models/payrollModel.js";
import {
  validatePayroll,
  calculateNetPay,
} from "../services/payrollService.js";
import { detectAnomalies } from "../services/anomalyService.js";

const payrollController = {
  create(req, res) {
    const payload = req.body;
    const errors = validatePayroll(payload);
    if (errors.length) return res.status(400).json({ errors });

    const created = Payroll.create(payload);
    return res.status(201).json({ data: created });
  },

  list(req, res) {
    const all = Payroll.findAll();
    return res.json({ data: all });
  },

  get(req, res) {
    const id = req.params.id;
    const rec = Payroll.findById(id);
    if (!rec) return res.status(404).json({ error: "not found" });
    return res.json({ data: rec });
  },

  update(req, res) {
    const id = req.params.id;
    const updates = req.body;
    const rec = Payroll.update(id, updates);
    if (!rec) return res.status(404).json({ error: "not found" });
    return res.json({ data: rec });
  },

  remove(req, res) {
    const id = req.params.id;
    const ok = Payroll.remove(id);
    if (!ok) return res.status(404).json({ error: "not found" });
    return res.status(204).send();
  },

  netpay(req, res) {
    // calculate net pay for a payroll record, or ad-hoc payload
    let payload = req.body;
    if (req.params.id) {
      const rec = Payroll.findById(req.params.id);
      if (!rec) return res.status(404).json({ error: "not found" });
      payload = Object.assign({}, rec);
    }
    const result = calculateNetPay(payload);
    return res.json({ data: result });
  },

  anomalies(req, res) {
    const all = Payroll.findAll();
    const anomalies = detectAnomalies(all);
    return res.json({ data: anomalies });
  },
};

export default payrollController;
