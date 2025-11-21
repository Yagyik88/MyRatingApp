const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.PG_USER || "postgres",
  host: process.env.PG_HOST || "localhost",
  database: process.env.PG_DB || "rating_app",
  password: process.env.PG_PASSWORD || "root",
  port: process.env.PG_PORT || 5432,
});

// test connection once on start
pool.connect()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch((err) => console.error("Connection error", err));

module.exports = pool;
