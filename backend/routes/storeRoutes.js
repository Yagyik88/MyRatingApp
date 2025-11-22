const express = require("express");
const router = express.Router();
const { createStore, getStores } = require("../controllers/storeController");
const { auth } = require("../middleware/authMiddleware");
const { requireRole } = require("../middleware/roleMiddleware");

// Admin creates store
router.post("/", auth, requireRole(["admin"]), createStore);

// Public - list all stores
router.get("/", getStores);

module.exports = router;
