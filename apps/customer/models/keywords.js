const Sequelize = require('sequelize');
const sequelize = require('../../../models/getSequelize').getSequelize();
const Ad = require('../../../models').Ad;

const Keywords = sequelize.define('keywords', {
  keyword: {
    type: Sequelize.STRING(45),
    primaryKey: true
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
  tableName: 'keywords',
  timestamps: false
});

module.exports = {
  Keywords
};