const Sequelize = require('sequelize');

const DATABASE_URL =
  process.env.DATABASE_URL || 'postgres://:5432/learn-together';

const db = new Sequelize(DATABASE_URL, {
  logging: false,
});

module.exports = db;
