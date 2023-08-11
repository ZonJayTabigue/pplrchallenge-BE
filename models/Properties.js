const  { Model, DataTypes} = require('sequelize');
const sequelize = require('../config/db');
const Users = require('./Users');

class Properties extends Model {}
Properties.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    street: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zip: DataTypes.STRING,
    rent: DataTypes.INTEGER
}, { sequelize, modelName: 'properties' });

Properties.belongsTo(Users, { foreignKey: 'user_id' });

module.exports = Properties;