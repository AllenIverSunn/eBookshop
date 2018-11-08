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

function LimitNumber(txt, num) {
  // var str = txt;
  // alert(txt)
  if (txt === null) {
    return;
  }
  if (txt.length <= num) {
    return txt;
  }
  let str = txt.substr(0, num) + '...' ;
  return str;
}

function rightCenterFixed() {
  const scroll_fix = $('#scroll');
  scroll_fix.css("top", $(document).scrollTop() + 0.5 * $(window).height() - scroll_fix.height() + "px");
  setTimeout(rightCenterFixed, 50);
}

const test_click = function (event) {
  alert(event);
};

// 记录翻了几页

const body = $(document.body);
$(document).ready(function () {
  //是排名悬浮
  rightCenterFixed();
  const userId = parseUrl(window.location).query.userId;
  const offset = parseInt(parseUrl(window.location).query.offset);
  // !!!!!!!!!!!!!!!一定要用decode和encode传递中文query参数！！而且要两次编码
  const type = decodeURI(decodeURI((parseUrl(window.location).query.type), "utf-8"));
  // 换页按钮
  $('#previous').click(function (event) {
    if (offset <= 0) {
      alert('已经是第一页了');
      return;
    }
    // offset -= 10;
    window.location = 'F:\\eBookshop\\eBookshop\\font_end\\ftmp8_3_dm\\book_list.html?userId=' + userId + '&type=' + encodeURI(encodeURI(type)) + '&offset=' + (offset-1);
  });

  $('#next').click(function (event) {
    // offset += 10;
    // alert(offset);
    const next_page = 'F:\\eBookshop\\eBookshop\\font_end\\ftmp8_3_dm\\book_list.html?userId=' + userId + '&type=' + encodeURI(encodeURI(type)) + '&offset=' + (offset+1);
    window.location = next_page;
  });

  //添加侧边栏的销量排序
  $.ajax({
    url: 'http://localhost:8080/v1/getSorted',
    dataType: 'json',
    data: {
      'type': type
    },
    type: 'post',
    async: true,
    success: function (data) {
      const books = data['data'];
      // alert(JSON.stringify(books));
      if (books.length >= 3) {
        const num1 = $("#num_1");
        const num2 = $("#num_2");
        const num3 = $("#num_3");

        num1.html(LimitNumber(books[0]['title'], 15));
        num1.attr("href", "F:\\eBookshop\\eBookshop\\font_end\\ftmp8_3_dm\\bookinfo.html?userId=" + userId + "&bookId=" + books[0]['id']);
        num2.html(LimitNumber(books[1]['title'], 15));
        num2.attr("href", "F:\\eBookshop\\eBookshop\\font_end\\ftmp8_3_dm\\bookinfo.html?userId=" + userId + "&bookId=" + books[1]['id']);
        num3.html(LimitNumber(books[2]['title'], 15));
        num3.attr("href", "F:\\eBookshop\\eBookshop\\font_end\\ftmp8_3_dm\\bookinfo.html?userId=" + userId + "&bookId=" + books[2]['id']);
      }
    }
  });

  // 导航栏添加链接至订单信息页
  const a_order = $("#order");
  a_order.attr("href", "F:\\eBookshop\\eBookshop\\font_end\\ftmp8_3_dm\\orders.html?userId=" + userId);
  //
  // 导航栏添加链接至购物车页
  const a_basket = $("#basket");
  a_basket.attr("href", "F:\\eBookshop\\eBookshop\\font_end\\ftmp8_3_dm\\basket.html?userId=" + userId);
  //
  // 导航栏添加链接至个人信息页
  const a_account = $("#account");
  a_account.attr("href", "F:\\eBookshop\\eBookshop\\font_end\\ftmp8_3_dm\\account.html?userId=" + userId);
  //

  $.ajax({
    url: 'http://localhost:8080/v1/book_list',
    dataType: 'json',
    data: {
      'type': type,
      'offset': offset
    },
    type: 'post',
    async: false,
    success: function (data) {
      const body = document.body;
      const book_list = data['data'];
      console.log(book_list);
      book_list.forEach(book => {
        // 这里class不要写成row-fluid
        const div = create_change_ele('div', {
          'class': 'row'
        });
        // $(div).addClass('container');
        const img_div = create_change_ele(
          'div', {
            'class': 'col-md-6'
          }
        );

        const details_div = create_change_ele(
          'div', {
            'class': 'col-md-6'
          }
        );

        const path = 'F:\\eBookshop\\make-money_v1\\crawler\\allBook\\' + book['ISBN'] + '\\book.png';
        const img = create_change_ele(
          'img', {
            'src': path,
            'width': 150,
            'height': 200
          }
        );

        const h = create_change_ele('a', {
            'class': 'a_post' + book['id'],
            'href': 'F:\\eBookshop\\eBookshop\\font_end\\ftmp8_3_dm\\bookinfo.html?bookId=' + book['id'] + '&userId=' + userId
            // 'onclick': "test_click()"
            // 'href': ''
          },
          '<h3>' + LimitNumber(book['title'], 40) + '</h3>',
        );
        const p = create_change_ele('p', {
            // 'class': 'list-group-text'
          },
          '<h4>作者: ' + LimitNumber(book['author'], 30) + '</h4>类型: ' + book['type']
        );
        img_div.appendChild(img);
        details_div.appendChild(h);
        details_div.appendChild(p);
        div.append(img_div);
        div.append(details_div);
        $('#main').append(div);
      });
    }
  });
});

