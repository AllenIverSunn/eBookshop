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

function LimitNumber(txt) {
  // var str = txt;
  // alert(txt)
  if (txt === null) {
    return;
  }
  if (txt.length <= 15) {
    return txt;
  }
  let str = txt.substr(0, 15) + '...' ;
  return str;
}

$(document).ready(function () {
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
  const types = ['文学', '政治与军事', '时尚', '烹饪美食与酒', '旅游与地图', '医学', '计算机与互联网', '科学与自然', '科技', '辞典与工具书', '大中专教材', '中小学教辅', '外语学习', '考试辅导', '经济管理', '国学', '法律', '历史', '心理学', '哲学与宗教', '社会科学', '孕产育儿', '家庭教育', '少儿', '艺术与摄影', '青春动漫', '传记', '小说'];
  for (i in types) {
    const type = types[i];
    $.ajax({
      url: "http://localhost:8080/v1/book_list",
      data: {
        'type': type,
        'offset': 0,
        'perPage': 4
      },
      dataType: 'json',
      type: 'post',
      async: false,
      success: function (data) {
        const content_div = create_change_ele('div', {
          'class': 'panel panel-default'
        });
        // 用来存放类标题
        const div1 = create_change_ele('div', {
          'class': 'row panel-heading',
          'id': 'header'
        });
        const h = create_change_ele('a', {
          // 将点击的类别用query传至booklist页面
          'href': 'F:\\eBookshop\\eBookshop\\font_end\\ftmp8_3_dm\\book_list.html?userId=' + userId + '&type=' + encodeURI(encodeURI(type)) + '&offset=0'
        }, "<h3>" + type + "</h3>");

        $(h).appendTo(div1);
        $(div1).appendTo(content_div);
        // 还要加上导航至此页的超链接

        // 用来展示每个类的几本书
        const div2 = create_change_ele('div', {
          'class': 'row panel-body',
          'id': 'books'
        });
        const books = data['data'];
        for (i in books) {
          const img_path = 'F:\\eBookshop\\make-money_v1\\crawler\\allBook\\'
          const book = books[i];
          const div = create_change_ele('div', {
            'class': 'col-md-3',
            'id': 'book'
          });
          const img = create_change_ele('img', {
            'src': img_path + book['ISBN'] + '\\book.png',
            'width': 250,
            'height': 250,
            'text-align': 'middle'
          });
          $(img).appendTo(div);

          const book_div = create_change_ele('div', {
            'class': 'panel panel-default'
          });

          const book_body = create_change_ele('div', {
            'class': 'panel-body'
          });
          const p = create_change_ele('a', {
              'id': 'title',
              'href': 'F:\\eBookshop\\eBookshop\\font_end\\ftmp8_3_dm\\bookinfo.html?userId=' + userId + '&bookId=' + book['id']
            },
            '<center><strong>' + LimitNumber(book['title']) + '</strong>' + '</center>');
          const book_footer = create_change_ele('div', {
            'class': 'panel-footer'
          });
          const author_span = create_change_ele('span', {
            'id': 'author'
          }, '<center>'+LimitNumber(book['author'])+'</center>');
          $(author_span).appendTo(book_footer);
          $(p).appendTo(book_body);
          $(book_body).appendTo(book_div);
          $(book_footer).appendTo(book_div);
          $(book_div).appendTo(div);
          $(div).appendTo(div2);
        }
        const container = $(".container");
        // $(div1).appendTo(container);
        $(div2).appendTo(content_div);
        $(content_div).appendTo(container);
      }
      // error: function(err) {
      //   alert('Error occurs');
      // }
    });
  }

  // 搜索
  $('#btn').click(function (event) {
    let input = $('#content').val();
    if (input !== '') {
      $.ajax({
        url: "http://localhost:8080/v1/search",
        data: {
          searchStr: input
        },
        dataType: 'json',
        type: 'post',
        async: false,
        success: function (data) {
          const book = data['data'];
          if (book === null) {
            alert('图书不存在');
          }
          // 去图书的详情界面
          alert(book['id']);
          window.open('F:\\eBookshop\\eBookshop\\font_end\\ftmp8_3_dm\\bookinfo.html?bookId=' + book['id']);
        }
      });
    }
  })
});

