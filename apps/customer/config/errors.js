const kexpress = require('kexpress');
const defineLogicalErrors = kexpress.errors.defineLogicalErrors;

module.exports = defineLogicalErrors({
  InternalException: {
    id: 57001,
    message: 'Server internal exception',
    status: 500,
  },
  UserNotFound: {
    id: 57002,
    message: 'User cannot be found.',
    status: 404
  },
  CustomerNotFound: {
    id: 57003,
    message: 'User is not found',
    status: 404,
  },
  ShopNotFound: {
    id: 57004,
    message: 'User is not found',
    status: 404,
  },
  AdNotFound: {
    id: 57005,
    message: 'Ad cannot be found',
    status: 404
  },
  // If there is no status field, the default status is 500
  FieldsError: {
    id: 57006,
    message: 'The format of fields is incorrect.'
  },
  VerifyCodeError: {
    id: 57007,
    message: 'The verification code is incorrect.',
  },
  AgentNotFound: {
    id: 57008,
    message: 'Agent is not found.',
    status: 404,
  },
  DupRegisterError: {
    id: 57009,
    message: 'duplicated registry.',
  },
  LackCenterError: {
    id: 57010,
    message: 'lack of center.',
  },
  InLoginError: {
    id: 57011,
    message: 'have not logined.',
  },
  MessageError: {
    id: 57012,
    message: 'can\'t send message'
  },
  FiveSecError: {
    id: 57013,
    message: 'not 5 seconds'
  },
  FavoriteExistEror: {
    id: 57014,
    message: 'Favorite exists'
  },
  WithdrawDetailsNotFound: {
    id: 57015,
    message: 'Withdraw Details not found'
  },
  WithdrawDetailsNotMatch: {
    id: 57016,
    message: 'Withdraw Details not match'
  },
  AliWithdrawError: {
    id: 57017,
    message: 'ali withdraw error'
  },
  LackMoneyError: {
    id: 57018,
    message: 'not sufficient funds'
  }
});
