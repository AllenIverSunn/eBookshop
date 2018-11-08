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

// const StickySidebar = require("sticky-sidebar").StickySidebar;

$(document).ready(function () {
  // const bookId = parseUrl(window.location).query.bookId;
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
      // const btn = create_change_ele('button', {
      //   'class': 'btn btn-primary btn-block',
      //   'type': 'button'
      // }, '提交');


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
        let tag = $("<td><span class='input-group-addon'>" + key + "</span></td>");
        tag.appendTo(row);
        let val = $("<td><input type='text' id='"+items_map[key]+"' class='form-control' value='" + book[items_map[key]] + "'></td>");
        val.appendTo(row);
      }
      //加一个提交按钮
      let row = $("<tr></tr>");
      row.appendTo(table);
      let btn = create_change_ele('button', {
        'class': 'btn btn-primary btn-block',
        'type': 'button',
        'id': 'submit'
      }, '提交');
      $(btn).appendTo(row);

      $(detials_div).append(table);
      $(img_div).append(img);
      // $(img_div).append(btn);
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
  });
  // 绑定提交按钮
  $('#submit').click(function(event) {
    alert(JSON.stringify({
      bookId: parseUrl(window.location).query.bookId,
      ISBN: $('#ISBN').val(),
      title: $('#title').val(),
      author: $('#author').val(),
      language: $('#language').val(),
      version: $('#version').val(),
      price: $('#price').val(),
      type: $('#type').val(),
      page: $('#page').val(),
      weight: $('#weight').val(),
      size: $('#size').val(),
      press: $('#press').val(),
      timeOnline: $('#timeOnline').val()
    }));
    $.ajax({
      url: 'http://localhost:8080/v1/admin/modifyBook',
      data: {
        bookId: parseUrl(window.location).query.bookId,
        ISBN: $('#ISBN').val(),
        title: $('#title').val(),
        author: $('#author').val(),
        language: $('#language').val(),
        version: $('#version').val(),
        price: $('#price').val(),
        type: $('#type').val(),
        page: $('#page').val(),
        weight: $('#weight').val(),
        size: $('#size').val(),
        press: $('#press').val(),
        timeOnline: $('#timeOnline').val()
      },
      dataType: 'json',
      type: 'post',
      async: false,
      success: function(data) {
        location.reload();
      }
    })
  })
});

