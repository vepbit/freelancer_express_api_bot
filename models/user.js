const {DataTypes} = require('sequelize');

const database_bot = require('../utils/database_bot')



const User = database_bot.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement: true},
    chatId: {type: DataTypes.STRING, unique: true},
    tags: {type: DataTypes.STRING, defaultValue: ''},
    autoupdate: {type: DataTypes.INTEGER, defaultValue: 'Off'},
    project_time_ago:{type: DataTypes.STRING},
    project_type: {type: DataTypes.STRING, defaultValue: 'all'},
    user_data: {type: DataTypes.STRING},
    tags_custom: {type: DataTypes.STRING, defaultValue: ''}
});




module.exports = User;