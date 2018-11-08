const Sequelize = require('sequelize');
const sequelize = require('./getSequelize').getSequelize();
const users = require('./users').Users;
const book = require('./bookinfo').Bookinfo;

const Remark = sequelize.define('remark', {
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
  text: {
    type: Sequelize.STRING(45)
  },
  remarkDate: {
    type: Sequelize.DATE
  }
}, {
  freezeTableName: true,
  tableName: 'remark',
  timestamps: false
});

module.exports = {
  Remark
};
