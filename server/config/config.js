require('dotenv').config()

module.exports = {
  development: {
    database: process.env.DATABASE_NAME,
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT
  },
  test: {
    database: process.env.DATABASE_NAME,
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT
  },
  production: {
    database: process.env.DATABASE_NAME,
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT
  },
}