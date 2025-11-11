# 💼 Payroll Management API

This project is a **Full Stack Coding Test Submission** for a **Compensation Platform**, built using **Node.js + Express + LowDB**.  
It demonstrates backend CRUD operations, authentication, payroll calculations, anomaly detection, and secure access control.  
AI coding assistance (GitHub Copilot + ChatGPT GPT-5) was used to enhance code quality and speed.

---

## 🚀 Features

### 1️⃣ Payroll CRUD API

- Create, Read, Update, and Delete employee payrolls.
- Fields:  
  `employee_id`, `name`, `department`, `salary`, `bonus`, `deductions`
- Input validation & error handling implemented.
- Unit & integration tests using **Jest + Supertest**.

### 2️⃣ Gross-to-Net Pay Calculation

- Calculates **net pay = (salary + bonus) − deductions − tax − social security**.
- Configurable tax and social security percentages.
- Returns detailed calculation breakdown.

### 3️⃣ Payroll Anomaly Detection

- Detects potential issues such as:
  - Excessive deductions (>50% of salary)
  - Salary deviations from department average
- Returns list of flagged employees.

### 4️⃣ Secure Authentication

- **JWT-based authentication** using roles:
  - `admin` – Full CRUD & anomaly access
  - `employee` – View own payroll only
- Middleware for `authenticate` and `authorizeRole`.

### 5️⃣ AI-Powered Development

- Documented below in [AI Assistance Summary](#🤖-ai-assistance-summary).

---

## ⚙️ Setup Instructions

### Prerequisites

- Node.js 18+
- npm (or yarn)

### Installation

```bash
git clone https://github.com/<your-username>/payroll-api.git
cd payroll-api
npm install
```

# Start Server

npm start

- Server runs by default on http://localhost:3000.

🧪 Running Tests

npm test

- Uses Jest + Supertest for API integration tests.

🔑 Environment Variables

| Variable         | Description        | Default     |
| ---------------- | ------------------ | ----------- |
| `PORT`           | Server port        | `3000`      |
| `JWT_SECRET`     | Secret key for JWT | `devsecret` |
| `JWT_EXPIRES_IN` | Token expiration   | `1h`        |

📘 API Examples

➕ Create Payroll

POST /payrolls

{
"employee_id": "E101",
"name": "John Doe",
"department": "Engineering",
"salary": 80000,
"bonus": 5000,
"deductions": 2000
}

Response:

{
"message": "Payroll created successfully",
"data": {
"employee_id": "E101",
"netPay": 70000
}
}

Use the returned token in Authorization header:

Authorization: Bearer <token>

🤖 AI Assistance Summary

- This project intentionally used AI coding assistants (ChatGPT GPT-5 & GitHub Copilot) to improve productivity and quality.
  Below are the details:

| Feature                   | AI Involvement | Description                                                         |
| ------------------------- | -------------- | ------------------------------------------------------------------- |
| Payroll CRUD API          | 60%            | Suggested controller structure, validation logic, and test coverage |
| Gross-to-Net Pay          | 40%            | Suggested tax/social formulas & handled edge cases                  |
| Payroll Anomaly Detection | 70%            | ChatGPT suggested anomaly thresholds and logic                      |
| Authentication            | 50%            | Guided JWT best practices and role-based access checks              |
| Documentation             | 90%            | README + API examples + formatting done using GPT-5                 |
| Tests                     | 40%            | Copilot autocompleted test assertions and structure                 |
