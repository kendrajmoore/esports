const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const config = require('../config/config')
const db = {}
const production = "production"

// const sequelize = new Sequelize('esports', null, null, {
//   host: 'localhost',
//   dialect: 'postgres' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
// });
if (process.env.NODE_ENV == production) {
  // the application is executed on Heroku ... use the postgres database
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect:  'postgres',
    protocol: 'postgres',
    port:     5432,
    host:     process.env.HOST,
    logging:  true //false
  })
} else {
  // the application is executed on the local machine ... use mysql
  sequelize = new Sequelize('esports', null, null, {
    host: 'localhost',
    dialect: 'postgres'
  })
}

fs
  .readdirSync(__dirname)
  .filter((file) =>
    file !== 'index.js'
  )
  .forEach((file) => {
 
    // for individual model files having `module.exports = (sequelize, DataTypes) => {`    
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  })

  sequelize.authenticate()
 .then(() => {
   console.log('Connection has been established successfully.');
 })
 .catch(err => {
   console.error('Unable to connect to the database:', err);
 });

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db