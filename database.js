'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const CodebitMySqlSemaphore = require("codebit-mysql-semaphore");

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/sequelize.js')[env];
const db = {};

// config.logging = console.log;

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname + '/src/models/')
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname + '/src/models', file)).init(sequelize);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

const semaphore = (lockName, timeout) => {
  return new CodebitMySqlSemaphore({
    host: config.host,
    port: config.port,
    database: config.database,
    user: config.username,
    password: config.password,
  }, lockName, timeout);
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Semaphore = semaphore;

module.exports = db;
