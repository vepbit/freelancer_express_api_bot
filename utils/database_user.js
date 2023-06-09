const Sequelize = require('sequelize')
require('dotenv').config()

const DB_NAME = process.env.DB_NAME_BOT
const USER_NAME = process.env.USER_NAME_BOT
const PASSWORD = process.env.PASSWORD_BOT
const HOST = process.env.HOST_BOT

const sequelize_user = new Sequelize(DB_NAME, USER_NAME, PASSWORD, {
    host: HOST,
    dialect: 'mysql',
    operatorsAliases: 0
})

module.exports = sequelize_user