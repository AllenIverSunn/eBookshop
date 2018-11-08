const Sequelize = require('sequelize');
const sequelize = require('./getSequelize').getSequelize();

const Users = sequelize.define('users', {
  username: {
    type: Sequelize.STRING(30)
  },
  name: {
    type: Sequelize.STRING(30)
  },
  pwd: {
    type: Sequelize.STRING(80)
  },
  email: {
    type: Sequelize.STRING(30)
  },
  privilige: {
    type: Sequelize.STRING(10)
  }
}, {
  freezeTableName: true,
  tableName: 'Users',
  timestamps: false
});

module.exports = {
  Users
};
