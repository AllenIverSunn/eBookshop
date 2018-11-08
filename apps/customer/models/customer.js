const Sequelize = require('sequelize');
const sequelize = require('../../../models/getSequelize').getSequelize();
const User = require('../../../models').User;
const Shop = require('../../shop/models').Shop;

const Customer = sequelize.define('customer', {
  userid: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  },
  customerId: {
    type: Sequelize.STRING(8)
  },
  gender: {
    type: Sequelize.STRING(2)
  },
  regTel: {
    type: Sequelize.STRING(20)
  },
  age: {
    type: Sequelize.STRING(2)
  },
  occupation: {
    type: Sequelize.STRING(45)
  },
  province: {
    type: Sequelize.STRING(45)
  },
  city: {
    type: Sequelize.STRING(45)
  },
  district: {
    type: Sequelize.STRING(45)
  },
  address: {
    type: Sequelize.STRING(45)
  },
  money: {
    type: Sequelize.DOUBLE
  },
  shop: {
    type: Sequelize.INTEGER,
    references: {
      model: Shop,
      key: 'id'
    }
  },
  name: {
    type: Sequelize.STRING(30)
  },
  registerTime: {
    type: Sequelize.DATE
  },
  batch: {
    type: Sequelize.INTEGER
  },
  telephone: {
    type: Sequelize.STRING(20)
  },
  privilige: {
    type: Sequelize.STRING(10)
  }
}, {
  freezeTableName: true,
  tableName: 'customer',
  timestamps: false
});

module.exports = {
  Customer
};
