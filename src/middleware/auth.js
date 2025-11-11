import jwt from "jsonwebtoken";

export function authenticate(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: "missing authorization" });
  const parts = auth.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer")
    return res.status(401).json({ error: "invalid authorization format" });
  try {
    const payload = jwt.verify(parts[1], process.env.JWT_SECRET || "devsecret");
    req.user = payload;
    return next();
  } catch (err) {
    return res.status(401).json({ error: "invalid token" });
  }
}

export function authorizeRole(role) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: "unauthenticated" });
    if (req.user.role !== role)
      return res.status(403).json({ error: "forbidden" });
    return next();
  };
}
