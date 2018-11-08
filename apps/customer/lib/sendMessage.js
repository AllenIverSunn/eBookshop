const SMSClient = require('@alicloud/sms-sdk');

// ACCESS_KEY_ID/ACCESS_KEY_SECRET 根据实际申请的账号信息进行替换
const accessKeyId = 'LTAIAxvHqEIFamVL';
const secretAccessKey = 'uBvb5jOGmpNMc3Owm0t3o7iscTAeDM';

// 在云通信页面开通相应业务消息后，就能在页面上获得对应的queueName,不用填最后面一段
// const queueName = 'Alicom-Queue-1092397003988387-';

// 初始化sms_client
const smsClient = new SMSClient({
  accessKeyId,
  secretAccessKey
});

// // 短信回执报告
// smsClient.receiveMsg(0, queueName).then(function (res) {
//   // 消息体需要base64解码
//   let {
//     code,
//     body
//   } = res
//   if (code === 200) {
//     // 处理消息体,messagebody
//     console.log(body)
//   }
// }, function (err) {
//   console.log(err)
// })

// // 短信上行报告
// smsClient.receiveMsg(1, queueName).then(function (res) {
//   // 消息体需要base64解码
//   let {
//     code,
//     body
//   } = res
//   if (code === 200) {
//     //处理消息体,messagebody
//     console.log(body)
//   }
// }, function (err) {
//   console.log(err)
// })


// // 查询短信发送详情
// smsClient.queryDetail({
//   PhoneNumber: '1500000000',
//   SendDate: '20170731',
//   PageSize: '10',
//   CurrentPage: "1"
// }).then(function (res) {
//   let {
//     Code,
//     SmsSendDetailDTOs
//   } = res
//   if (Code === 'OK') {
//     // 处理发送详情内容
//     console.log(SmsSendDetailDTOs)
//   }
// }, function (err) {
//   // 处理错误
//   console.log(err)
// })

// 发送短信
const sendMessage = async function(type, tel, code) {
  let TemplateCode = '';
  if (type === 'login') {
    TemplateCode = 'SMS_116825188';
  }
  else if (type === 'register') {
    TemplateCode = 'SMS_116825186';
  }
  const res = await smsClient.sendSMS({
    PhoneNumbers: tel,
    SignName: '阿里云短信测试专用',
    TemplateCode: TemplateCode,
    TemplateParam: `{"code": "${code}"}`
  });

  return res;
};

module.exports = {
  sendMessage
};

