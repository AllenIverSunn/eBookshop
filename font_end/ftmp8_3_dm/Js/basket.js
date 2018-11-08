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
  const a_order = $("#order");
  a_order.attr("href", "F:\\eBookshop\\eBookshop\\font_end\\ftmp8_3_dm\\orders.html?userId=" + userId);
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
    url: 'http://localhost:8080/v1/getBasket',
    data: {
      userId: userId
    },
    dataType: 'json',
    type: 'post',
    async: false,
    success: function (data) {
      const books = data['data'];
      const bookIds = [];
      const tbody = $('#basket_table');
      let prices = 0;
      // 加载书细节
      for (i in books) {
        const book = books[i];
        // 为了后面的购物车的付款
        bookIds.push(book['id']);
        prices += parseFloat(book['price']);
        const row = $("<tr></tr>");
        row.appendTo(tbody);
        const title = $("<td style='vertical-align: middle;word-wrap:break-word;'></td>");
        title.appendTo(row);
        const info_path = "F:\\eBookshop\\eBookshop\\font_end\\ftmp8_3_dm\\bookinfo.html?";
        // 添加购物车中书籍名字指向商品的链接
        const title_div = $("<div></div>");
        const title_link = create_change_ele(
          'a', {
            'href': info_path + "bookId=" + book['id'] + "&userId=" + userId
          }, "<font size=4>" + book['title'] + "</font>"
        );
        //
        $(title_link).appendTo(title_div);
        title_div.appendTo(title);
        // 添加书的封面
        const img = $("<td style='vertical-align: middle;'></td>");
        const img_div = create_change_ele('img', {
          'src': 'F:\\eBookshop\\make-money_v1\\crawler\\allBook\\' + book['ISBN'] + '\\book.png',
          'width': 200,
          'height': 200
        });
        $(img_div).appendTo(img);
        img.appendTo(row);
        //
        const author = $("<td style='vertical-align: middle;'>" + book['author'] + "</td>");
        author.appendTo(row);
        const price = $("<td style='vertical-align: middle;'>" + book['price'] + "</td>");
        price.appendTo(row);

        // 从购物车移除
        const remove_td = $("<td style='vertical-align: middle;'></td>");
        remove_td.appendTo(row);
        const remove = $("<button>移除</button>");
        remove.appendTo(remove_td);
        remove.click(function (event) {
          $.ajax({
            url: 'http://localhost:8080/v1/removeBasket',
            data: {
              userId: userId,
              bookId: book['id']
            },
            dataType: 'json',
            type: 'post',
            async: false,
            success: function (data) {
              window.open('F:\\eBookshop\\eBookshop\\font_end\\ftmp8_3_dm\\basket.html?userId=' + userId)
            }
          })
        });
        //
      }
      const all_price_row = $("<tr></tr>");
      all_price_row.appendTo(tbody);
      const tag = $("<td style='vertical-align: middle;'>总计: </td>");
      tag.appendTo(all_price_row);
      const blank_tag1 = $("<td style='vertical-align: middle;'></td>");
      blank_tag1.appendTo(all_price_row);
      const blank_tag2 = $("<td style='vertical-align: middle;'></td>");
      blank_tag2.appendTo(all_price_row);
      const price_tag = $("<td style='vertical-align: middle;'>" + prices + "</td>");
      price_tag.appendTo(all_price_row);
      // 付款按钮
      $("#check").click(function (event) {
        $.ajax({
          url: 'http://localhost:8080/v1/newOrder',
          data: {
            userId: userId,
            bookIds: JSON.stringify(bookIds)
          },
          dataType: 'json',
          type: 'post',
          async: false,
          success: function (data) {
            alert("付款成功");
            window.open('F:\\eBookshop\\eBookshop\\font_end\\ftmp8_3_dm\\basket.html?userId=' + userId);
          }
        })
      });
    }

  });

});

