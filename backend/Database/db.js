const { Pool } = require("pg");
const dbPool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "map",
  password: "123",
  port: 5432,
});

module.exports = {
  query: (text, params) => dbPool.query(text, params),
};
