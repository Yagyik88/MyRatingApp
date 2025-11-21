const db = require("../config/db");

// Submit or update rating (user only)
exports.submitRating = async (req, res) => {
  try {
    const userId = req.user.id;
    const { storeId, rating } = req.body;
    if (!storeId || !rating) return res.status(400).json({ message: "storeId and rating required" });
    if (rating < 1 || rating > 5) return res.status(400).json({ message: "Rating must be 1-5" });

    // Check if rating exists -> update, else insert
    const check = await db.query("SELECT id FROM ratings WHERE user_id = $1 AND store_id = $2", [userId, storeId]);
    if (check.rows.length > 0) {
      await db.query("UPDATE ratings SET rating = $1, created_at = now() WHERE id = $2", [rating, check.rows[0].id]);
      return res.json({ message: "Rating updated" });
    } else {
      await db.query("INSERT INTO ratings (user_id, store_id, rating) VALUES ($1,$2,$3)", [userId, storeId, rating]);
      return res.status(201).json({ message: "Rating submitted" });
    }
  } catch (err) {
    console.error("submitRating error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get ratings for a store (owner)
exports.getRatingsForStore = async (req, res) => {
  try {
    const ownerId = req.user.id;

    // find the owner's store(s)
    const storesRes = await db.query("SELECT id FROM stores WHERE owner_id = $1", [ownerId]);
    const storeIds = storesRes.rows.map(r => r.id);
    if (storeIds.length === 0) return res.json({ ratings: [], average: 0 });

    // fetch ratings for those stores
    const ratingsRes = await db.query(
      `SELECT r.id, r.rating, r.created_at, u.id AS user_id, u.name AS user_name, r.store_id
       FROM ratings r
       JOIN users u ON u.id = r.user_id
       WHERE r.store_id = ANY($1::int[]) ORDER BY r.created_at DESC`, [storeIds]
    );

    // average rating per owner store (or overall)
    const avgRes = await db.query(
      `SELECT COALESCE(AVG(rating)::numeric(10,2),0) AS average FROM ratings WHERE store_id = ANY($1::int[])`, [storeIds]
    );

    res.json({ ratings: ratingsRes.rows, average: avgRes.rows[0].average });
  } catch (err) {
    console.error("getRatingsForStore error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
