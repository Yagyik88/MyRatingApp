const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { auth } = require("../middleware/authMiddleware");

// public
router.get("/test", (req, res) => res.send("User routes working"));
router.post("/signup", userController.signup);
router.post("/login", userController.login);

// authenticated
router.post("/change-password", auth, userController.changePassword);
router.get("/:id", auth, userController.getUser); // admin or self can view; front checks role

module.exports = router;
