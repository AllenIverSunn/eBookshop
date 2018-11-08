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
  $("#changePassword").attr("href", "F:\\eBookshop\\eBookshop\\font_end\\ftmp8_3_dm\\changePassword.html?userId=" + userId);
  // 导航栏添加链接至订单信息页
  const a_order = $("#order");
  a_order.attr("href", "F:\\eBookshop\\eBookshop\\font_end\\ftmp8_3_dm\\orders.html?userId=" + userId);
  //
  // 导航栏添加链接至购物车页
  const a_basket = $("#basket");
  a_basket.attr("href", "F:\\eBookshop\\eBookshop\\font_end\\ftmp8_3_dm\\basket.html?userId=" + userId);
  //
  // 导航栏添加链接至图书页
  const a_book = $("#book");
  a_book.attr("href", "F:\\eBookshop\\eBookshop\\font_end\\ftmp8_3_dm\\book_sorts_list.html?userId=" + userId);
  //
  $.ajax({
    url: 'http://localhost:8080/v1/getAccount',
    data: {
      userId: userId
    },
    dataType: 'json',
    type: 'post',
    async: false,
    success: function (data) {
      const account = data['data'];
      const username = $("#username");
      const name = $("#name");
      const email = $("#email");

      username.attr("value", account['username']);
      name.attr("value", account['name']);
      email.attr("value", account['email']);

      // 修改个人信息
      $("#save").click(function (event) {
        $.ajax({
          url: 'http://localhost:8080/v1/modifyAccount',
          data: {
            userId: userId,
            username: username.val(),
            name: name.val(),
            email: email.val()
          },
          dataType: 'json',
          type: 'post',
          async: false,
          success: function (data) {
            alert('保存成功');
            window.location.href = "F:\\eBookshop\\eBookshop\\font_end\\ftmp8_3_dm\\account.html?userId=" + userId;
          }
        });
      });
    }
  });

});

