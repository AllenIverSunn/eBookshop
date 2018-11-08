const create_change_ele = function (ele, attrs, text) {
  const element = document.createElement(ele);
  // element.setAttribute(attrs);
  for (let key in attrs) {
    element.setAttribute(key, attrs[key]);
  }
  if (arguments.length === 3) {
    // alert(text);
    $(element).html(text);
  }
  return element;
};

function parseUrl(url) {
  var a = document.createElement('a');
  a.href = url;
  return {
    protocol: a.protocol.replace(':', ''),
    hostname: a.hostname,
    port: a.port,
    path: a.pathname,
    query: (() => {
      var query = a.search.substr(1);
      var queryArr = query.split('&');
      var queryObj = {};
      queryArr.forEach((item, index) => {
        var item = item.split('=');
        var key = item[0];
        queryObj[key] = item[1];
      })
      return queryObj;
    })(),
    params: (() => {
      var params = a.hash.substr(1);
      var paramsArr = params.split('#');
      return paramsArr;

    })(),
  }
}


$(document).ready(function () {
  const userId = parseUrl(window.location).query.userId;
  // 导航栏添加链接至用户信息页
  const a_account = $("#account");
  a_account.attr("href", "F:\\eBookshop\\eBookshop\\font_end\\ftmp8_3_dm\\account.html?userId=" + userId);
  // 导航栏添加链接至订单信息页
  const a_order = $("#order");
  a_order.attr("href", "F:\\eBookshop\\eBookshop\\font_end\\ftmp8_3_dm\\orders.html?userId=" + userId);
  //
  // 导航栏添加链接至购物车页
  const a_basket = $("#basket");
  a_order.attr("href", "F:\\eBookshop\\eBookshop\\font_end\\ftmp8_3_dm\\basket.html?userId=" + userId);
  //
  // 导航栏添加链接至图书页
  const a_book = $("#book");
  a_order.attr("href", "F:\\eBookshop\\eBookshop\\font_end\\ftmp8_3_dm\\book_sort_list.html?userId=" + userId);
  //

  // 修改密码
  $("#save").click(function (event) {
    const pwd1 = $("#password1");
    const pwd2 = $("#password2");
    if (pwd1.val() !== pwd2.val()) {
      alert("两次输入的密码不一致");
      return;
    }
    $.ajax({
      url: 'http://localhost:8080/v1/changePassword',
      data: {
        userId: userId,
        password: hex_md5(pwd1.val())
      },
      dataType: 'json',
      type: 'post',
      async: false,
      success: function (data) {
        alert('密码更换成功');
        window.location.href = "F:\\eBookshop\\eBookshop\\font_end\\ftmp8_3_dm\\account.html?userId=" + userId;
      }
    });
  });
});

