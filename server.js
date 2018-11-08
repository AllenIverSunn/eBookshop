const kexpress = require('kexpress');
const serverConfig = require('./config/server');
const Server = kexpress.core.server.Server;
const CustomerApplication = require('./apps/customer/app').Application;

const customerServer = new Server(CustomerApplication, serverConfig.customer);

customerServer.start();
