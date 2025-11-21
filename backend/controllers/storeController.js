const db = require("../config/db");

// Create store (Admin Only)
exports.createStore = async (req, res) => {
    try {
        const { name, address, email } = req.body;

        if (!name || !email) {
            return res.status(400).json({ message: "Name and Email required" });
        }

        await db.query(
            `INSERT INTO stores (name, email, address) VALUES ($1, $2, $3)`,
            [name, email, address]
        );

        res.json({ message: "Store created" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

// Public - List all stores
exports.getStores = async (req, res) => {
  try {
    const userId = req.user?.id || null; // normal user logged in

    const storesRes = await db.query(`
      SELECT s.id, s.name, s.email, s.address,
      COALESCE(AVG(r.rating), 0) AS avg_rating
      FROM stores s
      LEFT JOIN ratings r ON s.id = r.store_id
      GROUP BY s.id
      ORDER BY s.name ASC
    `);

    const stores = storesRes.rows;

    // If user is not logged in OR not normal user → return only avg ratings
    if (!userId) return res.json(stores);

    // Fetch user’s ratings for all stores
    const userRatingsRes = await db.query(
      "SELECT store_id, rating FROM ratings WHERE user_id = $1",
      [userId]
    );

    const userRatingsMap = {};
    userRatingsRes.rows.forEach((r) => {
      userRatingsMap[r.store_id] = r.rating;
    });

    // Add user rating to each store
    const final = stores.map((s) => ({
      ...s,
      user_rating: userRatingsMap[s.id] || 0
    }));

    res.json(final);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

