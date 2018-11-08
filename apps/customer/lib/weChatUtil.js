const MD5 = require('./md5').MD5;
const https = require('https');
const fs = require('fs');

function createNonceStr() {
  return Math.random().toString(36).substr(2, 15);
}

function createOrderId(userId) {
  const orderId = new Date().getTime() + userId + Math.ceil((Math.random() * 900) + 100);

  return orderId;
}

function genCode(a) {
  delete a.sign;
  const b = Object.keys(a).map(key => {
    return `${key}=${a[key]}`;
  });
  b.sort();
  const str = b.join('&');
  const key = fs.readFileSync('apps/customer/config/apiclient_key.pem');
  const stringSignTemp = `${str}&key=${key}`;
  const sign = MD5(stringSignTemp).toUpperCase();
  // 注：MD5签名方式

  return sign;
}

module.exports = {
  createNonceStr,
  createOrderId,
  genCode
};
