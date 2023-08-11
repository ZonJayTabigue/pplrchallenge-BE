const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class Users extends Model {}
Users.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING
}, { sequelize, modelName: 'users' });

module.exports = Users;