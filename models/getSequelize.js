const Sequelize = require('sequelize');
const databaseConfig = require('../config/database');

let sequelize = null;

function getSequelize() {
  if (sequelize === null) {
    const database = databaseConfig.database;
    console.log(database);
    sequelize = new Sequelize(
      database.database,
      database.username,
      database.password,
      {
        host: database.host,
        port: database.port,
        dialect: database.dialect,
        pool: databaseConfig.pool
      }
    );
  }

  return sequelize;
  console.log('========================================');
  console.log(sequelize);
  console.lof('========================================');
}

module.exports = {
  getSequelize: getSequelize
};
