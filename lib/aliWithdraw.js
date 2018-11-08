const bizParams = {
  out_biz_no: '',
  payee_type: 'ALIPAY_LOGONID',
  payee_account: '',
  amount: 0
};

const params = {
  app_id: '2018010301546359',
  method: 'alipay.fund.trans.toaccount.transfer',
  charset: 'utf-8',
  sign_type: 'RSA2',
  version: '1.0',
  biz_content: bizParams
  // 业务请求参数的集合，最大长度不限，除公共参数外所有请求参数都必须放在这个参数中传递，具体参照各产品快速接入文档
};

module.exports = {
  params
};
