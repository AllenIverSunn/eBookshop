const Sequelize = require('sequelize');
const sequelize = require('../../../models/getSequelize').getSequelize();
const Customer = require('./customer').Customer;
const Shop = require('./shop').Shop;

const WithdrawDetails = sequelize.define('Withdrawdetails', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true
  },
  type: {
    type: Sequelize.ENUM,
    // 0???, 1???
    values: [0, 1]
  },
  customer: {
    type: Sequelize.INTEGER,
    references: {
      model: Customer,
      key: 'id'
    }
  },
  shop: {
    type: Sequelize.INTEGER,
    references: {
      model: Shop,
      key: 'id'
    }
  },
  money: {
    type: Sequelize.DOUBLE
  },
  status: {
    type: Sequelize.ENUM,
    values: ['unfinished', 'finished']
  },
  time: {
    type: Sequelize.DATE
  },
  name: {
    type: Sequelize.STRING(30)
  }
}, {
  freezeTableName: true,
  tableName: 'withdrawdetails',
  timestamps: false
});

module.exports = {
  WithdrawDetails
};
