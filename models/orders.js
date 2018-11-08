const Sequelize = require('sequelize');
const sequelize = require('./getSequelize').getSequelize();
const users = require('./users').Users;
const book = require('./bookinfo').Bookinfo;

const Orders = sequelize.define('orders', {
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
  },
  soldDate: {
    type: Sequelize.DATE
  },
  status: {
    type: Sequelize.STRING(30)
  }
}, {
  freezeTableName: true,
  tableName: 'orders',
  timestamps: false
});

module.exports = {
  Orders
};

