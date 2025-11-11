// Simple anomaly detection strategies:
// - excessive deductions (> 50% of gross)
// - salary outliers (z-score based)

function detectAnomalies(payrolls) {
  const anomalies = [];
  if (!Array.isArray(payrolls) || payrolls.length === 0) return anomalies;

  // compute mean and std dev for salary
  const salaries = payrolls.map((p) => Number(p.salary || 0));
  const mean = salaries.reduce((a, b) => a + b, 0) / salaries.length;
  const variance =
    salaries.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / salaries.length;
  const std = Math.sqrt(variance);

  for (const p of payrolls) {
    const gross = Number(p.salary || 0) + Number(p.bonus || 0);
    const deductions = Number(p.deductions || 0);
    if (gross > 0 && deductions / gross > 0.5) {
      anomalies.push({
        id: p.id,
        reason: "excessive_deductions",
        details: { gross, deductions, ratio: roundTwo(deductions / gross) },
      });
    }

    // salary z-score > 3
    const z = std === 0 ? 0 : (Number(p.salary) - mean) / std;
    if (Math.abs(z) > 3) {
      anomalies.push({
        id: p.id,
        reason: "salary_outlier",
        details: { salary: p.salary, z },
      });
    }
  }

  return anomalies;
}

function roundTwo(n) {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

export { detectAnomalies };
