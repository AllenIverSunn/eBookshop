const Sequelize = require('sequelize');
const sequelize = require('../../../models/getSequelize').getSequelize();

const Advertisement = sequelize.define('advertisement', {
  id: {
    type: Sequelize.STRING(8),
    primaryKey: true,
    unique: true
  },
  title: {
    type: Sequelize.STRING(45)
  },
  type: {
    type: Sequelize.INTEGER
  },
  startTime: {
    type: Sequelize.DATE
  },
  endTime: {
    type: Sequelize.DATE
  },
  adRange: {
    type: Sequelize.INTEGER
  },
  shop: {
    type: Sequelize.STRING(8),
    references: {
      model: 'User',
      key: 'id'
    }
  },
  content: {
    type: Sequelize.STRING(45)
  },
  telephone: {
    type: Sequelize.STRING(45)
  },
  status: {
    type: Sequelize.ENUM,
    values: ['等待审核', '正在审核', '审核通过']
  },
  surfPopulation: {
    type: Sequelize.INTEGER
  },
  surfPopulationYesterday: {
    type: Sequelize.INTEGER
  },
  totalCost: {
    type: Sequelize.DOUBLE
  },
  address: {
    type: Sequelize.STRING
  }
}, {
  freezeTableName: true,
  tableName: 'advertisement',
  timestamps: false
});

module.exports = {
  Advertisement
};
