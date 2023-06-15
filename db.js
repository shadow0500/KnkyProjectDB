const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "KnkyProjectDB",
  password: "Khan@1705",
  port: 5433,
});

module.exports = pool;
