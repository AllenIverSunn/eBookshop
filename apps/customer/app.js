const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const kexpress = require('kexpress');
const httpSession = require('express-session');
const connectSession = require('connect-session');
const MySQLStore = require('connect-mysql')(connectSession);
const databaseConfig = require('../../config/database');
const logger = require('ktoolkit').logger.output;
const cors = require('cors');

const customerRouter = require('./routes/customer').router;

class Application extends kexpress.core.app.Application {
  constructor() {
    super({
      baseUrl: '/v1'
    });
  }

  // Override
  async prepare() {
    try {
      // const session = kexpress.middlewares.session;
      const watcher = kexpress.middlewares.access.watcher;
      // const firefoxHttpRequesterFixer = kexpress.middlewares['ff-http-fixer'].firefoxHttpRequesterFixer;
      const RequestChecker = require('kexpress-http').RequestChecker;
      const FieldsCheckerErrorHandler = require('./prehandlers/fields').errorHandler;
      // this.use(httpSession({
      //   resave: true,
      //   secret: '123456',
      //   key: 'bookshop_key',
      //   cookie: {
      //     maxAge: 1000 * 60 * 60 * 24 * 365
      //   },
      //   saveUninitialized: true,
      //   store: new MySQLStore({
      //     config: {
      //       host: databaseConfig.database.host,
      //       user: databaseConfig.database.username,
      //       password: databaseConfig.database.password,
      //       database: databaseConfig.database.database
      //     }
      //   })
      // }));
      // this.use(firefoxHttpRequesterFixer());
      // this.use(express.static(path.join(__dirname, 'public')));
      // this.use(watcher);
      // this.use(bodyParser.json());
      // this.use(bodyParser.urlencoded({
      //   extended: true
      // }));
      this.use(express.static(path.join(__dirname, 'public')));
      this.use(watcher);
      this.use(bodyParser.json({
        limit: 10000000
      }));
      this.use(bodyParser.urlencoded({
        extended: true
      }));

      this.prehandle('request', new RequestChecker(FieldsCheckerErrorHandler));
      this.use(cors());
      this.use('/v1', customerRouter);
    }
    catch (error) {
      logger.error(error);
    }
  }
}

module.exports = {
  Application: Application
};
