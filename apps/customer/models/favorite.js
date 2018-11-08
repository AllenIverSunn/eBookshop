const Sequelize = require('sequelize');
const sequelize = require('../../../models/getSequelize').getSequelize();
const Customer = require('./customer').Customer;
const Ad = require('../../../models').Ad;

const Favorite = sequelize.define('favorite', {
  customer: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    references: {
      model: Customer,
      key: 'userid'
    }
  },
  ad: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    references: {
      model: Ad,
      key: 'id'
    }
  }
}, {
  freezeTableName: true,
  tableName: 'favorite',
  timestamps: false
});

module.exports = {
  Favorite
};