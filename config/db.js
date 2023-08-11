const { Sequelize } = require('sequelize');
require('dotenv').config();

//Database Connection

const sequelize = new Sequelize(process.env.PGSQL_DB, process.env.PGSQL_USERNAME, process.env.PGSQL_PASS, {
    host: 'localhost',
    dialect: 'postgres',
    define:  {
        timestamps: false
    },
    
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 1000
    }
  
});

module.exports = sequelize;