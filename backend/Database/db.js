const { Pool } = require('pg');
const dbPool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

module.exports = {
  query: (text, params) => dbPool.query(text, params),
};
