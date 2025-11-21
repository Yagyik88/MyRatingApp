require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

// DB
require("./config/db");

// Routes
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const storeRoutes = require("./routes/storeRoutes");
const ratingRoutes = require("./routes/ratingRoutes");

// Middleware
app.use(cors());
app.use(express.json());

// Mount routes
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/stores", storeRoutes);
app.use("/api/ratings", ratingRoutes);

app.listen(5000, () => {
  console.log("Backend running on port 5000");
});
