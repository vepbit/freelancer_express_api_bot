const {DataTypes} = require('sequelize');

const sequelize_project = require('../utils/sequelize_project')


const Project = sequelize_project.define('list', {
    id: {type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement: true},
    title: {type: DataTypes.STRING},
    full_description: {type: DataTypes.STRING},
    currency: {type: DataTypes.STRING},
    budget_min: {type: DataTypes.STRING},
    budget_max: {type: DataTypes.STRING},
    project_type: {type: DataTypes.STRING},
    url: {type: DataTypes.STRING, unique: true},
    publishtime: {type: DataTypes.STRING, unique: true},
    tags: {type: DataTypes.STRING},
    recruiter: {type: DataTypes.STRING},
    verifiedverifiedemail: {type: DataTypes.INTEGER},
    made_payment: {type: DataTypes.INTEGER},
    verified_ident: {type: DataTypes.INTEGER},
    verifiedpayment: {type: DataTypes.INTEGER},
    country:{type: DataTypes.STRING}
},{
    tableName: "list"
   }
   );


   module.exports = Project;