const sequelize = require('../models/getSequelize').getSequelize();

const Admin = require('../apps/admin/models').Admin;
const logger = require('ktoolkit').logger.output;

async function main() {
  await Admin.sync();

  await Admin.findOrCreate({
    where: {
      loginName: 'admin'
    },
    defaults: {
      password: 'Abba7481?'
    }
  });

  logger.info('Created database successfully');

  await sequelize.close();
}

main();
