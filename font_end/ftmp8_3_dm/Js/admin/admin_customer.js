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
  //绑定图书管理按钮
  $("#book").click(function (e) {
    window.location = './admin_book';
  });

  //载入数据
  $.ajax({
    url: "http://localhost:8080/v1/admin/getCustomer",
    data: {},
    dataType: 'json',
    type: 'post',
    async: false,
    success: function (data) {
      // delete $('#content');
      const content = $("#content");
      const customers = data['data'];
      const table = create_change_ele('table', {
        'class': 'table table-striped'
      });
      // 生成书籍信息表格
      const header = create_change_ele('thead');
      // 表头
      const head_tr = create_change_ele('tr');
      let attrs = ['用户名', '姓名', 'E-mail', '权限'];
      for (i in attrs) {
        let attr = attrs[i];
        let h = create_change_ele('th', {}, attr);
        $(h).appendTo(head_tr);
      }
      $(head_tr).appendTo(header);
      $(header).appendTo(table);

      // 生成表格
      const tbody = create_change_ele('tbody');
      // alert(JSON.stringify(customers));
      for (i in customers) {
        let customer = customers[i];
        // alert(JSON.stringify(customer));
        let body_tr = create_change_ele('tr');
        let attrs = ['username', 'name', 'email', 'privilige'];
        for (j in attrs) {
          let attr = attrs[j];
          let th = create_change_ele('th', {}, customer[attr]);
          $(th).appendTo(body_tr);
        }
        //删除用户和修改用户按钮
        let th_delete = create_change_ele('th');
        let btn_delete = create_change_ele('button', {
          'class': 'btn btn-primary',
          'type': 'button',
          'id': 'delete'
        }, '删除');
        $(btn_delete).appendTo(th_delete);
        $(th_delete).appendTo(body_tr);

        let th_modify = create_change_ele('th');
        let btn_modify = create_change_ele('button', {
          'class': 'btn btn-primary',
          'type': 'button',
          'id': 'modify'
        }, '修改');
        $(btn_modify).appendTo(th_modify);
        $(th_modify).appendTo(body_tr);

        // 绑定这两个按钮
        $(btn_modify).click(function(event) {
          window.open('F:\\eBookshop\\eBookshop\\font_end\\ftmp8_3_dm\\Js\\admin\\modifyCustomer.html?userId='+customer['id']);
        });
        // 绑定删除按钮
        $(btn_delete).click(function(event) {
          $.ajax({
            url: "http://localhost:8080/v1/admin/deleteCustomer",
            data: {
              userId: customer['id']
            },
            dataType: 'json',
            type: 'post',
            async: false,
            success: function(data) {
              if (data['successful'] === false) {
                alert('此项无法被删除');
              } else {
                location.reload();
              }
            }
          });
        });

        $(body_tr).appendTo(tbody);
      }
      $(tbody).appendTo(table);
      $(table).appendTo(content);
    }
  });

  //绑定搜索
  $("#btn").click(function (e) {
    const searchStr = $("#search_content").val();
    $.ajax({
      url: "http://localhost:8080/v1/admin/getCustomer",
      data: {},
      dataType: 'json',
      type: 'post',
      async: false,
      success: function (data) {

      }
    })
  });

  //绑定图书管理按钮
  $('#book').click(function(e) {
    window.location = './admin_book.html';
  });

})
