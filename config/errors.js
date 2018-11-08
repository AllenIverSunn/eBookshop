const kexpress = require('kexpress');
const defineLogicalErrors = kexpress.errors.defineLogicalErrors;

module.exports = defineLogicalErrors({
  InternalException: {
    id: 67001,
    message: 'Server internal exception',
    status: 500,
  },
  UserNotFound: {
    id: 67002,
    message: 'User cannot be found',
    status: 500
  },
  UserNotFound: {
    id: 67003,
    message: 'Book cannot be found',
    status: 500
  },
  OrderNotFound: {
    id: 67004,
    message: 'Order cannot be found',
    status: 500
  },
  OrderFinished: {
    id: 67005,
    message: 'Order has been finished',
    status: 500
  },
  WrongPassword: {
    id: 67006,
    message: 'Got wrong password',
    status: 500
  },
  DupRegisterError: {
    id: 67007,
    message: 'Duplicate registration',
    status: 500
  },
  BookNotFound: {
    id: 67008,
    message: "Book cannot be found",
    status: 500
  },
  BasketNotFound: {
    id: 67009,
    message: "This book does not exsit in your basket",
    status: 500
  },
  AdminError: {
    id: 67010,
    message: "Not Admin please leave this page",
    status: 500
  },
  BookExisted: {
    id: 67011,
    message: "Book existed",
    status: 500
  }
});
