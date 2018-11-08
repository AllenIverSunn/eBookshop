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
  alert(userId);
  $.ajax({
    url: 'http://localhost:8080/v1/getAccount',
    data: {
      userId: userId
    },
    dataType: 'json',
    type: 'post',
    async: false,
    success: function (data) {
      const user = data['data'];
      const username = $("#username");
      const name = $("#name");
      const email = $("#email");
      const privilige = $("#privilige");

      username.attr("value", user['username']);
      name.attr("value", user['name']);
      email.attr("value", user['email']);
      privilige.attr("value", user['privilige']);

      // 修改个人信息
      $("#submit").click(function (event) {
        $.ajax({
          url: 'http://localhost:8080/v1/admin/modifyCustomer',
          data: {
            userId: userId,
            username: username.val(),
            name: name.val(),
            email: email.val(),
            privilige: privilige.val()
          },
          dataType: 'json',
          type: 'post',
          async: false,
          success: function (data) {
            alert('保存成功');
            // alert(userId);
            window.location.href = "F:\\eBookshop\\eBookshop\\font_end\\ftmp8_3_dm\\JS\\admin\\admin_customer.html";
          }
        });
      });
    }
  });

});

