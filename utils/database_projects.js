const Sequelize = require('sequelize')
require('dotenv').config()

const DB_NAME = process.env.DB_NAME_PROJECT
const USER_NAME = process.env.USER_NAME_PROJECT
const PASSWORD = process.env.PASSWORD_PROJECT
const HOST = process.env.HOST_PROJECT

const sequelize_project = new Sequelize(DB_NAME, USER_NAME, PASSWORD, {
    host: HOST,
    dialect: 'mysql',
    define: {
        timestamps: false
    }
})

module.exports = sequelize_project