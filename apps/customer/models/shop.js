const Sequelize = require('sequelize');
const sequelize = require('../../../models/getSequelize').getSequelize();
const User = require('../../../models').User;
const BusinessType = require('../../../models').BusinessType;
const Customer = require('./customer').Customer;

const Shop = sequelize.define('shop', {
  shopId: {
    type: Sequelize.STRING(8)
  },
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  },
  regTel: {
    type: Sequelize.STRING(20)
  },
  shopName: {
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
    type: Sequelize.STRING(80)
  },
  busitype: {
    type: Sequelize.INTEGER,
    references: {
      model: BusinessType,
      key: 'id'
    }
  },
  licence: {
    type: Sequelize.STRING
  },
  telephone: {
    type: Sequelize.STRING(20)
  },
  owner: {
    type: Sequelize.STRING(30)
  },
  status: {
    type: Sequelize.ENUM,
    values: [0, 1, 2]
  },
  rank: {
    type: Sequelize.INTEGER
  },
  agent: {
    type: Sequelize.STRING(8)
  },
  surfPopulation: {
    type: Sequelize.INTEGER
  },
  income: {
    type: Sequelize.DOUBLE
  },
  account: {
    type: Sequelize.DOUBLE
  },
  newBatch: {
    type: Sequelize.INTEGER
  },
  longitude: {
    type: Sequelize.DOUBLE
  },
  latitude: {
    type: Sequelize.DOUBLE
  },
  customerCount: {
    type: Sequelize.INTEGER
  },
  customer: {
    type: Sequelize.INTEGER,
    references: {
      model: Customer,
      key: 'id'
    }
  }
}, {
  freezeTableName: true,
  tableName: 'shop',
  timestamps: false
});

module.exports = {
  Shop
};

