const checkVericode = function(body, session, type) {
  if (session[type]) {
    const now = new Date().getTime();
    if (body.telephone === session.tel && session[type].verifyCode === body.verifyCode && session[type].expired > now) {
      return true;
    }
  }

  return false;
};

module.exports = {
  checkVericode
};
