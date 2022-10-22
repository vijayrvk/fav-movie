const { Pool } = require('pg');
require('dotenv').config()
const envConfigs = require(__dirname + '/../config/config');
const env = process.env.NODE_ENV || 'development';
const config = envConfigs[env];
const pool = new Pool({
  user: process.env.USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.PASSWORD,
  port: process.env.DB_PORT,
});

async function query(query, params) {
    const {rows, fields} = await pool.query(query, params);

    return rows;
}

module.exports = {
  query
}