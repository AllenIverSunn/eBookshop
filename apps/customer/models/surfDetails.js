const Sequelize = require('sequelize');
const sequelize = require('../../../models/getSequelize').getSequelize();
const Customer = require('./customer').Customer;
const Ad = require('../../../models/ad').Ad;

const SurfDetails = sequelize.define('surfDetails', {
  ad: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    references: {
      model: Ad,
      key: 'id'
    }
  },
  customer: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    references: {
      model: Customer,
      key: 'id'
    }
  },
  time: {
    type: Sequelize.DATE
  },
  last: {
    type: Sequelize.INTEGER
  }
}, {
  freezeTableName: true,
  tableName: 'surfdetails',
  timestamps: false
});

module.exports = {
  SurfDetails
};
