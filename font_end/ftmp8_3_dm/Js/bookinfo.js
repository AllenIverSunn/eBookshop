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

function readTextFile(filepath) {
  var str = "";
  var txtFile = new File(string, filepath);
  txtFile.open("r");
  while (!txtFile.eof) {
    // read each line of text
    str += txtFile.readln();
  }
  return str;
}

//设置悬浮窗
function rightCenterFixed() {
  const scroll_fix = $('#scroll');
  scroll_fix.css("top", $(document).scrollTop() + 0.5 * $(window).height() - scroll_fix.height() + "px");
  setTimeout(rightCenterFixed, 50);
}


$(document).ready(function () {
  //设置悬浮窗
  $('#scroll').css("position", "absolute");
  $('#scroll').css("right", 0);
  rightCenterFixed();

  const userId = parseUrl(window.location).query.userId;
  // 导航栏添加链接至订单信息页
  const a_order = $("#order");
  a_order.attr("href", "F:\\eBookshop\\eBookshop\\font_end\\ftmp8_3_dm\\orders.html?userId=" + userId);
  //
  // 导航栏添加链接至购物车页
  const a_basket = $("#basket");
  a_basket.attr("href", "F:\\eBookshop\\eBookshop\\font_end\\ftmp8_3_dm\\basket.html?userId=" + userId);
  //
  // 导航栏添加链接至图书页
  const a_account = $("#account");
  a_account.attr("href", "F:\\eBookshop\\eBookshop\\font_end\\ftmp8_3_dm\\account.html?userId=" + userId);
  //
  // 在侧边栏加上加入购物车的按钮
  const a_add_basket = $("#add_basket");
  a_add_basket.click(function (event) {
    $.ajax({
      url: 'http://localhost:8080/v1/addBasket',
      data: {
        userId: userId,
        bookId: parseUrl(window.location).query.bookId
      },
      dataType: 'json',
      type: 'post',
      async: false,
      success: function (data) {
        alert('已加入购物车！');
      }
    })
  });

  $("#back").click(function (event) {
    history.go(-1);
  });

  $.ajax({
    url: 'http://localhost:8080/v1/bookinfo',
    data: {
      bookId: parseUrl(window.location).query.bookId
    },
    dataType: 'json',
    type: 'post',
    async: false,
    success: function (data) {
      const book = data['data'];
      alert(JSON.stringify(book));
      const div = create_change_ele('div', {
        'class': 'row'
      });

      const img_div = create_change_ele('div', {
        'class': 'col-md-4'
      });

      const img = create_change_ele('img', {
        'src': 'F:\\eBookshop\\make-money_v1\\crawler\\allBook\\' + book['ISBN'] +
          '\\book.png',
        'width': 350,
        'height': 400
      });

      const detials_div = create_change_ele('div', {
        'class': 'col-md-6 col-md-offset-2'
      });

      const table = create_change_ele('table', {
        'class': 'table table-striped'
      });

      const items_map = {
        'ISBN': 'ISBN',
        '书名': 'title',
        '作者': 'author',
        '语言': 'language',
        '装订版本': 'version',
        '价格': 'price',
        '类型': 'type',
        '页数': 'page',
        '重量': 'weight',
        '大小': 'size',
        '出版社': 'press',
        '出版日期': 'timeOnline'
      };

      for (key in items_map) {
        let row = $("<tr></tr>");
        row.appendTo(table);
        let tag = $("<td>" + key + "</td>");
        tag.appendTo(row);
        let val = $("<td>" + book[items_map[key]] + "</td>");
        val.appendTo(row);
      }
      $(detials_div).append(table);
      $(img_div).append(img);
      $(div).append(img_div);
      $(div).append(detials_div);


      // 加载书细节
      const book_div = create_change_ele('div', {
        'class': 'row'
      });
      $(book_div).html(book['book_details']);
      $(div).append(book_div);
      $('#main').append(div);
    }
  })
});

