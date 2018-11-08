const Sequelize = require('sequelize');
const sequelize = require('./getSequelize').getSequelize();
const users = require('./users').Users;
const book = require('./bookinfo').Bookinfo;

const Basket = sequelize.define('basket', {
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: users,
      key: 'id'
    }
  },
  bookId: {
    type: Sequelize.INTEGER,
    references: {
      model: book,
      key: 'id'
    }
  }
}, {
  freezeTableName: true,
  tableName: 'basket',
  timestamps: false
});

module.exports = {
  Basket
};
