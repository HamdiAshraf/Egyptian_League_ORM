require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE, {
    logging: console.log, // Enable logging, defaults to console.log
});

module.exports = sequelize;