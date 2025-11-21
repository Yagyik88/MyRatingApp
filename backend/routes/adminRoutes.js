const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { auth } = require("../middleware/authMiddleware");
const { requireRole } = require("../middleware/roleMiddleware");

// all admin endpoints protected and role = admin
router.get("/stats", auth, requireRole(["admin"]), adminController.getStats);
router.post("/add-user", auth, requireRole(["admin"]), adminController.addUser);
router.post("/add-store", auth, requireRole(["admin"]), adminController.addStore);
router.get("/stores", auth, requireRole(["admin"]), adminController.listStores);
router.get("/users", auth, requireRole(["admin"]), adminController.listUsers);

module.exports = router;
