const md5 = require("md5");

const a = 'Sun';
const b = md5(a);
console.log(b);
console.log(md5(b));