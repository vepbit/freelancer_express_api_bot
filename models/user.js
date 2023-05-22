const { DataTypes } = require("sequelize");

const database_user = require("../utils/database_user");

const User = database_user.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  chatId: { type: DataTypes.STRING, unique: true },
  tags: { type: DataTypes.STRING, defaultValue: "" },
  autoupdate: { type: DataTypes.STRING, defaultValue: "On" },
  project_time_ago: { type: DataTypes.STRING, defaultValue: 20 },
  project_type: { type: DataTypes.STRING, defaultValue: "all" },
  user_data: { type: DataTypes.STRING },
  tags_custom: { type: DataTypes.STRING, defaultValue: "" },
  password: { type: DataTypes.STRING },
});

module.exports = User;
