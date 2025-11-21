const express = require("express");
const router = express.Router();
const ratingController = require("../controllers/ratingController");
const { auth } = require("../middleware/authMiddleware");
const { requireRole } = require("../middleware/roleMiddleware");

// submit/update rating (normal users)
router.post("/", auth, requireRole(["normal"]), ratingController.submitRating);

// store owner view ratings for their stores
router.get("/owner", auth, requireRole(["store_owner"]), ratingController.getRatingsForStore);

module.exports = router;
