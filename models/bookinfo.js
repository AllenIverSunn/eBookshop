const Sequelize = require('sequelize');
const sequelize = require('./getSequelize').getSequelize();

const Bookinfo = sequelize.define('bookinfo', {
  ISBN: {
    type: Sequelize.STRING(13)
  },
  title: {
    type: Sequelize.STRING(1000)
  },
  author: {
    type: Sequelize.STRING(40)
  },
  language: {
    type: Sequelize.STRING(20)
  },
  ASIN: {
    type: Sequelize.STRING(20)
  },
  version: {
    type: Sequelize.STRING(200)
  },
  price: {
    type: Sequelize.STRING(60)
  },
  type: {
    type: Sequelize.STRING(40)
  },
  shapeCode: {
    type: Sequelize.STRING(20)
  },
  page: {
    type: Sequelize.STRING(20)
  },
  weight: {
    type: Sequelize.STRING(20)
  },
  size: {
    type: Sequelize.STRING(30)
  },
  press: {
    type: Sequelize.STRING(2000)
  },
  timeOnline: {
    type: Sequelize.STRING(80)
  },
  sales: {
    type: Sequelize.INTEGER
  }
}, {
  freezeTableName: true,
  tableName: 'bookinfo',
  timestamps: false
});

module.exports = {
  Bookinfo
};
