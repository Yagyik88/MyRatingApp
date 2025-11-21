const db = require("../config/db");
const bcrypt = require("bcryptjs");

// Admin: get stats
exports.getStats = async (req, res) => {
  try {
    const usersRes = await db.query("SELECT COUNT(*) FROM users");
    const storesRes = await db.query("SELECT COUNT(*) FROM stores");
    const ratingsRes = await db.query("SELECT COUNT(*) FROM ratings");

    res.json({
      users: parseInt(usersRes.rows[0].count),
      stores: parseInt(storesRes.rows[0].count),
      ratings: parseInt(ratingsRes.rows[0].count),
    });
  } catch (err) {
    console.error("getStats error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Admin: add user (admin can create any role)
exports.addUser = async (req, res) => {
  try {
    const { name, email, address, password, role } = req.body;

    if (!name || name.length < 20 || name.length > 60) return res.status(400).json({ message: "Name must be 20-60 characters." });
    if (address && address.length > 400) return res.status(400).json({ message: "Address too long" });
    if (!email) return res.status(400).json({ message: "Email required" });

    // simple role whitelist
    if (!["admin","normal","store_owner"].includes(role)) return res.status(400).json({ message: "Invalid role" });

    const exist = await db.query("SELECT id FROM users WHERE email = $1", [email]);
    if (exist.rows.length > 0) return res.status(400).json({ message: "Email already registered" });

    const hashed = await bcrypt.hash(password, 10);

    const result = await db.query(
      "INSERT INTO users (name,email,address,password,role) VALUES ($1,$2,$3,$4,$5) RETURNING id",
      [name, email, address, hashed, role]
    );

    res.status(201).json({ message: "User created", userId: result.rows[0].id });
  } catch (err) {
    console.error("addUser error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Admin: add store
exports.addStore = async (req, res) => {
  try {
    const { name, email, address, owner_id } = req.body;
    if (!name) return res.status(400).json({ message: "Store name required" });

    const result = await db.query(
      "INSERT INTO stores (name, email, address, owner_id) VALUES ($1,$2,$3,$4) RETURNING id",
      [name, email, address, owner_id || null]
    );

    res.status(201).json({ message: "Store created", storeId: result.rows[0].id });
  } catch (err) {
    console.error("addStore error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Admin: list stores with avg rating
exports.listStores = async (req, res) => {
  try {
    // filters via query params (name, email, address)
    const { name, email, address, sortBy = "name", order = "asc" } = req.query;

    let where = [];
    let params = [];
    let i = 1;

    if (name) { where.push(`s.name ILIKE $${i}`); params.push(`%${name}%`); i++;}
    if (email) { where.push(`s.email ILIKE $${i}`); params.push(`%${email}%`); i++;}
    if (address) { where.push(`s.address ILIKE $${i}`); params.push(`%${address}%`); i++;}

    const whereSQL = where.length ? `WHERE ${where.join(" AND ")}` : "";

    const query = `
      SELECT s.id, s.name, s.email, s.address,
        COALESCE(AVG(r.rating)::numeric(10,2),0) AS avg_rating
      FROM stores s
      LEFT JOIN ratings r ON r.store_id = s.id
      ${whereSQL}
      GROUP BY s.id
      ORDER BY ${sortBy === 'email' ? 's.email' : (sortBy === 'address' ? 's.address' : 's.name')} ${order === 'desc' ? 'DESC' : 'ASC'}
    `;

    const result = await db.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error("listStores error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Admin: list users
exports.listUsers = async (req, res) => {
  try {
    const { name, email, address, role, sortBy = "name", order = "asc" } = req.query;

    let where = [];
    let params = [];
    let i = 1;

    if (name) { where.push(`name ILIKE $${i}`); params.push(`%${name}%`); i++;}
    if (email) { where.push(`email ILIKE $${i}`); params.push(`%${email}%`); i++;}
    if (address) { where.push(`address ILIKE $${i}`); params.push(`%${address}%`); i++;}
    if (role) { where.push(`role = $${i}`); params.push(role); i++;}

    const whereSQL = where.length ? `WHERE ${where.join(" AND ")}` : "";

    const orderByColumn = (sortBy === 'email' ? 'email' : (sortBy === 'address' ? 'address' : 'name'));

    const query = `SELECT id, name, email, address, role FROM users ${whereSQL} ORDER BY ${orderByColumn} ${order === 'desc' ? 'DESC' : 'ASC'}`;

    const result = await db.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error("listUsers error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
