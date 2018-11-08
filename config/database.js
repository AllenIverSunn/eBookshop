module.exports = {
  database: {
    host: 'localhost',
    port: '3306',
    database: 'bookshop',
    username: 'sun',
    password: '123456',
    dialect: 'mysql'
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
