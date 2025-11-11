import express from "express";
const router = express.Router();
import controller from "../controllers/payrollController.js";
import { authenticate, authorizeRole } from "../middleware/auth.js";

// Admin routes (create/update/delete) - require admin role
router.post("/", authenticate, authorizeRole("admin"), controller.create);
router.get("/", authenticate, controller.list);
router.get(
  "/anomalies",
  authenticate,
  authorizeRole("admin"),
  controller.anomalies
);
router.get("/:id", authenticate, controller.get);
router.put("/:id", authenticate, authorizeRole("admin"), controller.update);
router.delete("/:id", authenticate, authorizeRole("admin"), controller.remove);

// net pay calculation
router.post("/:id/net", authenticate, controller.netpay);
router.post("/net", authenticate, controller.netpay);

export default router;
