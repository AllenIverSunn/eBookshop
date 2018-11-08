const Sequelize = require('sequelize');
const sequelize = require('../../../models/getSequelize').getSequelize();
const Shop = require('./shop').Shop;
const Customer = require('./customer').Customer;

const Shop_customer = sequelize.define('shop_customer', {
  shop: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    references: {
      model: Shop,
      key: 'id'
    }
  },
  customer: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    references: {
      model: Customer,
      key: 'id'
    }
  }
}, {
  freezeTableName: true,
  tableName: 'shop_customer',
  timestamps: false
});

module.exports = {
  Shop_customer
};