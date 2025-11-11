const TAX_PERCENT = Number(process.env.TAX_PERCENT || 10);
const SOCIAL_PERCENT = Number(process.env.SOCIAL_SECURITY_PERCENT || 5);

function validatePayroll(payload) {
  const errors = [];
  if (!payload.employee_id) errors.push("employee_id required");
  if (!payload.name) errors.push("name required");
  if (typeof payload.salary !== "number") errors.push("salary must be number");
  if (payload.bonus && typeof payload.bonus !== "number")
    errors.push("bonus must be number");
  if (payload.deductions && typeof payload.deductions !== "number")
    errors.push("deductions must be number");
  return errors;
}

function calculateNetPay({
  salary,
  bonus = 0,
  deductions = 0,
  taxPercent = TAX_PERCENT,
  socialPercent = SOCIAL_PERCENT,
}) {
  // gross = salary + bonus
  const gross = Number(salary) + Number(bonus);
  // taxes and social contributions
  const tax = (gross * Number(taxPercent)) / 100;
  const social = (gross * Number(socialPercent)) / 100;
  const net = gross - tax - social - Number(deductions);
  return {
    gross: roundTwo(gross),
    tax: roundTwo(tax),
    social: roundTwo(social),
    deductions: roundTwo(deductions),
    net: roundTwo(net),
  };
}

function roundTwo(n) {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

export { calculateNetPay, validatePayroll };
