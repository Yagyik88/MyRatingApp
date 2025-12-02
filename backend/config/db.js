const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DB,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

// Retry connection logic
const connectWithRetry = () => {
  console.log("Attempting PostgreSQL connection...");

  pool.connect()
    .then(() => console.log("Connected to PostgreSQL"))
    .catch((err) => {
      console.error("PostgreSQL not ready, retrying in 3 seconds...", err.message);
      setTimeout(connectWithRetry, 3000);
    });
};

// start retry loop 
connectWithRetry();

module.exports = pool;
