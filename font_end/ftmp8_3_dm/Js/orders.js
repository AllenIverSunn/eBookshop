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


$(document).ready(function () {
  const userId = parseUrl(window.location).query.userId;

  // 导航栏添加链接至订单信息页
  const a_basket = $("#basket");
  a_basket.attr("href", "F:\\eBookshop\\eBookshop\\font_end\\ftmp8_3_dm\\basket.html?userId=" + userId);
  //
  // 导航栏添加链接至购物车页
  const a_book = $("#book");
  a_book.attr("href", "F:\\eBookshop\\eBookshop\\font_end\\ftmp8_3_dm\\book_sorts_list.html?userId=" + userId);
  //
  // 导航栏添加链接至图书页
  const a_account = $("#account");
  a_account.attr("href", "F:\\eBookshop\\eBookshop\\font_end\\ftmp8_3_dm\\account.html?userId=" + userId);
  //

  $.ajax({
    url: 'http://localhost:8080/v1/getOrders',
    data: {
      userId: userId
    },
    dataType: 'json',
    type: 'post',
    async: false,
    success: function (data) {
      const orders = data['data'];
      const tbody = $('#order_table');
      // 加载订单细节
      for (i in orders) {
        const order = orders[i];
        const row = $("<tr></tr>");
        row.appendTo(tbody);
        const title = $("<td></td>");
        title.appendTo(row);
        const info_path = "F:\\eBookshop\\eBookshop\\font_end\\ftmp8_3_dm\\bookinfo.html?";
        // 添加购物车中书籍名字指向商品的链接
        const title_div = $("<div></div>");
        const title_link = create_change_ele(
          'a', {
            'href': info_path + "bookId=" + order['bookId'] + "&userId=" + userId
          }, "<strong>" + order['title'] + "</strong>"
        );
        //
        $(title_link).appendTo(title_div);
        title_div.appendTo(title);
        // 添加书的封面
        const img = $("<td></td>");
        const img_div = create_change_ele('div', {
          'src': 'F:\\eBookshop\\make-money_v1\\crawler\\allBook\\'+order['ISBN']+'\\book.png',
          'width': 100,
          'height': 150
        });
        $(img_div).appendTo(img);
        img.appendTo(row);
        //
        // const author = $("<td>" + order['author'] + "</td>");
        // author.appendTo(row);
        const price = $("<td>" + order['price'] + "</td>");
        price.appendTo(row);
        const date = $("<td style='white-space:nowrap'>" + order['soldDate'].toString() + "</td>");
        date.appendTo(row);
      }
      // const all_price_row = $("<tr></tr>");
      // all_price_row.appendTo(tbody);
      // const tag = $("<td>总计: </td>");
      // tag.appendTo(all_price_row);
      // const blank_tag = $("<td></td>");
      // blank_tag.appendTo(all_price_row);
      // const price_tag = $("<td>" + prices + "</td>")
      // price_tag.appendTo(all_price_row);
    }
  })
});

