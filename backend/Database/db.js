const { Pool } = require("pg");
const dbPool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "maptow",
  password: "123",
  port: 5432,
});

module.exports = {
  query: (text, params) => dbPool.query(text, params),
};
// todo update pass and name