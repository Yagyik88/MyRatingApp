// authMiddleware.js
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "Authorization header missing" });

    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Token missing" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "mysecretkey");
    req.user = decoded; // { id, role, iat, exp }
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
