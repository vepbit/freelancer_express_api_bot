const { DataTypes } = require("sequelize");

const database_user = require("../utils/database_user");

const Role = database_user.define("role", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  },
  name: { type: DataTypes.STRING, unique: true, default: "user" },
});

module.exports = Role;
