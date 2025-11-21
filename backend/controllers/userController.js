const bcrypt = require("bcryptjs");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const db = require("../config/db");
require("dotenv").config();

// SIGNUP
exports.signup = async (req, res) => {
  try {
    const { name, email, address, password } = req.body;

    if (!name || name.length < 20 || name.length > 60) {
      return res.status(400).json({ message: "Name must be 20-60 characters." });
    }
    if (address && address.length > 400) {
      return res.status(400).json({ message: "Address max length is 400 characters." });
    }
    if (!validator.isEmail(email || "")) {
      return res.status(400).json({ message: "Invalid email." });
    }
    const passRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,16}$/;
    if (!passRegex.test(password || "")) {
      return res.status(400).json({ message: "Password must be 8-16 chars, include uppercase and special char." });
    }

    const existing = await db.query("SELECT id FROM users WHERE email = $1", [email]);
    if (existing.rows.length > 0) return res.status(400).json({ message: "Email already registered." });

    const hashed = await bcrypt.hash(password, 10);
    const result = await db.query(
      `INSERT INTO users (name, email, address, password, role) VALUES ($1,$2,$3,$4,'normal') RETURNING id, role`,
      [name, email, address, hashed]
    );

    return res.status(201).json({ message: "User registered successfully", userId: result.rows[0].id, role: result.rows[0].role });
  } catch (err) {
    console.error("signup error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email & password required" });

    const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);
    if (result.rows.length === 0) return res.status(400).json({ message: "User not found" });

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Incorrect password" });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || "mysecretkey", { expiresIn: "7d" });

    return res.json({ message: "Login successful", token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    console.error("login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// CHANGE PASSWORD (authenticated)
exports.changePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) return res.status(400).json({ message: "Old and new password required" });

    const result = await db.query("SELECT password FROM users WHERE id = $1", [userId]);
    if (result.rows.length === 0) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(oldPassword, result.rows[0].password);
    if (!isMatch) return res.status(400).json({ message: "Old password incorrect" });

    const passRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,16}$/;
    if (!passRegex.test(newPassword)) return res.status(400).json({ message: "New password must meet requirements" });

    const hashed = await bcrypt.hash(newPassword, 10);
    await db.query("UPDATE users SET password = $1 WHERE id = $2", [hashed, userId]);

    res.json({ message: "Password updated" });
  } catch (err) {
    console.error("changePassword error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get user details (admin or self)
exports.getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const userRes = await db.query(
      "SELECT id, name, email, address, role FROM users WHERE id = $1",
      [id]
    );

    if (userRes.rows.length === 0)
      return res.status(404).json({ message: "User not found" });

    const user = userRes.rows[0];

    // If NOT store owner → return as is
    if (user.role !== "store_owner") {
      return res.json(user);
    }

    // If store owner → fetch store + average rating
    const storeRes = await db.query(
      "SELECT id, name, email, address FROM stores WHERE owner_id = $1",
      [id]
    );

    const stores = storeRes.rows;

    if (stores.length === 0) {
      return res.json({
        ...user,
        stores: [],
        average_rating: 0
      });
    }

    const storeIds = stores.map((s) => s.id);

    const avgRes = await db.query(
      `SELECT COALESCE(AVG(rating)::numeric(10,2), 0) AS average 
       FROM ratings 
       WHERE store_id = ANY($1::int[])`,
      [storeIds]
    );

    return res.json({
      ...user,
      stores,
      average_rating: avgRes.rows[0].average
    });
  } catch (err) {
    console.error("getUser error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
