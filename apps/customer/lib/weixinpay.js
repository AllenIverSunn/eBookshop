const request = require('request');
const xml2js = require('xml2js');

function paysign(appid, attach, body, mch_id, nonce_str, notify_url, out_trade_no, spbill_create_ip, total_fee, trade_type) { //统一下单签名
  const ret = {
    appid: appid,
    attach: attach,
    body: body,
    mch_id: mch_id,
    nonce_str: nonce_str,
    notify_url: notify_url,
    out_trade_no: out_trade_no,
    spbill_create_ip: spbill_create_ip,
    total_fee: total_fee,
    trade_type: trade_type
  };
  let string = raw(ret);
  const key = '微信商户密钥';
  string = string + '&key=' + key; //key为在微信商户平台(pay.weixin.qq.com)-->账户设置-->API安全-->密钥设置
  let crypto = require('crypto');
  console.log("签名");
  console.log(crypto.createHash('md5').update(string, 'utf8').digest('hex').toUpperCase());
  return crypto.createHash('md5').update(string, 'utf8').digest('hex').toUpperCase();
};

function raw(args) {
  let keys = Object.keys(args);
  keys = keys.sort()
  let newArgs = {};
  keys.forEach(function (key) {
    newArgs[key.toLowerCase()] = args[key];
  });

  let string = '';
  for (let k in newArgs) {
    string += '&' + k + '=' + newArgs[k];
  }
  string = string.substr(1);
  console.log(string);
  return string;
};

exports.pay = function (req, res) //微信支付函数
{
  let url = "https://api.mch.weixin.qq.com/pay/unifiedorder";
  let appid = '应用微信中的id';
  let mch_id = '商户号';
  let notify_url = 'www.spamao.com';
  let out_trade_no = req.query.orderId; < span style = "background-color: rgb(255, 255, 102);" > < span style = "color:#FFFF66;" > < span style = "background-color: rgb(255, 255, 255);" > < /span></span > < /span>/ / 客户端 < span style = "background-color: rgb(255, 255, 102);" > < span style = "color:#FFFF66;" > < span style = "background-color: rgb(255, 255, 255);" > < /span></span > < /span>订单号
  let total_fee = req.query.orderRate; < span style = "background-color: rgb(255, 255, 102);" > < span style = "color:#FFFF66;" > < span style = "background-color: rgb(255, 255, 255);" > < /span></span > < /span>/ / 客户端 < span style = "background-color: rgb(255, 255, 102);" > < span style = "color:#FFFF66;" > < span style = "background-color: rgb(255, 255, 255);" > < /span></span > < /span>商品价格
  let attach = 'spamao用户版app';
  let body = req.query.content; //客户端商品描述
  let nonce_str = '随机32位之内字符串';
  let formData = "<xml>";
  formData += "<appid>" + appid + "</appid>"; //appid
  formData += "<attach>" + attach + "</attach>"; //附加数据
  formData += "<body>" + body + "</body>"; //商品或支付单简要描述
  formData += "<mch_id>" + mch_id + "</mch_id>"; //商户号
  formData += "<nonce_str>" + nonce_str + "</nonce_str>"; //随机字符串，不长于32位
  formData += "<notify_url>" + notify_url + "</notify_url>"; //支付成功后微信服务器通过POST请求通知这个地址

  formData += "<out_trade_no>" + out_trade_no + "</out_trade_no>"; //订单号
  formData += "<spbill_create_ip>112.124.60.251</spbill_create_ip>"; //服务端ip
  formData += "<total_fee>" + total_fee + "</total_fee>"; //金额
  formData += "<trade_type>APP</trade_type>"; //类型APP
  formData += "<sign>" + paysign(appid, attach, body, mch_id, nonce_str, notify_url, out_trade_no, '112.124.60.251', total_fee, 'APP') + "</sign>";
  formData += "</xml>";
  request({
    url: url,
    method: 'POST',
    body: formData
  }, function (err, response, body) {
    if (!err && response.statusCode == 200) {
      console.log(body);
      let parser = new xml2js.Parser({
        trim: true,
        explicitArray: false,
        explicitRoot: false
      }); //解析签名结果xml转json
      parser.parseString(body, function (err, result) {
        let timeStamp = Date.parse(new Date()) / 1000;
        let sign = paySignTwo(appid, nonce_str, 'Sign=WXPay', mch_id, result['prepay_id'], timeStamp); //得到prepay再次签名
        res.send({
          result: {
            'appid': appid,
            'mch_id': mch_id,
            'prepay_id': result['prepay_id'],
            'nonce_str': nonce_str,
            'time_stamp': timeStamp,
            'package_value': 'Sign=WXPay',
            'sign': sign
          }
        }); //返回客户端数据
      });

    }
  });
}

function buildXML(json) {
  let builder = new xml2js.Builder();
  return builder.buildObject(json);
};

function paySignTwo(appid, notifystr, packagevalue, mchid, prepayid, timestamp) { //参数名不可改，必须严格一模一样（在此我掉坑一次）
  let ret = {
    appid: appid,
    noncestr: notifystr,
    package: packagevalue,
    partnerid: mchid,
    prepayid: prepayid,
    timestamp: timestamp
  };
  let string = raw(ret);
  let key = '商户密钥';
  string = string + '&key=' + key; //key为在微信商户平台(pay.weixin.qq.com)-->账户设置-->API安全-->密钥设置
  let crypto = require('crypto');
  console.log("签名");
  console.log(crypto.createHash('md5').update(string, 'utf8').digest('hex').toUpperCase());
  return crypto.createHash('md5').update(string, 'utf8').digest('hex').toUpperCase();
};
