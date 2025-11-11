import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import db from "./db.js";
import authRoutes from "./routes/authRoutes.js";
import payrollRoutes from "./routes/payrollRoutes.js";

dotenv.config();
db.read();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Initialize Database
await db.read();
db.data ||= { payrolls: [], users: [] };

// Health check
app.get("/", (req, res) => {
  res.json({ message: "Payroll API is running 🚀" });
});

// Routes
app.use("/auth", authRoutes);
app.use("/payrolls", payrollRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
  });
});

const PORT = process.env.PORT || 3000;

// Start server only if not in test mode
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
}

export default app;
