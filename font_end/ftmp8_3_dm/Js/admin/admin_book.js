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
// let page = 0;
$(document).ready(function () {
  //绑定用户管理按钮
  $('#customer').click(function(e) {
    window.locaiton = './admin_customer.html';
  });

  //载入界面
  $.ajax({
    url: "http://localhost:8080/v1/admin/getBookList",
    data: {
      'offset': 0,
      'perPage': 100
    },
    dataType: 'json',
    type: 'post',
    async: false,
    success: function(data) {
      const content = $('#content');
      const books = data['data'];
      const table = create_change_ele('table', {
        'class': 'table table-hover'
      });
      // 生成书籍信息表格
      const header = create_change_ele('thead');
      // 表头
      const head_tr = create_change_ele('tr');
      let attrs = ['书名', 'ISBN', '作者', '销量', '页数', '售价'];
      for (i in attrs) {
        let attr = attrs[i];
        let h = create_change_ele('th', {}, attr);
        $(h).appendTo(head_tr);
      }
      $(head_tr).appendTo(header);
      $(header).appendTo(table);

      // 生成表格
      const tbody = create_change_ele('tbody');
      for (i in books) {
        let book = books[i];
        let body_tr = create_change_ele('tr');
        let attrs = ['title', 'ISBN', 'author', 'sales', 'page', 'price'];
        for (j in attrs) {
          let attr = attrs[j];
          let th = null;
          if (attr === 'price') {
            th = create_change_ele('th', {}, book[attr].split('|')[0]);
          } else {
            th = create_change_ele('th', {}, book[attr]);
          }
          
          $(th).appendTo(body_tr);
        }
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
          window.open('F:\\eBookshop\\eBookshop\\font_end\\ftmp8_3_dm\\Js\\admin\\modifyBookinfo.html?bookId='+book['id']);
        });
        // 绑定删除按钮
        $(btn_delete).click(function(event) {
          $.ajax({
            url: "http://localhost:8080/v1/admin/deleteBook",
            data: {
              bookId: book['id']
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
  $("#btn").click(function(event) {
    let input = $('#search_content').val();
    alert(input);
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
          // alert(book['id']);
          window.open('F:\\eBookshop\\eBookshop\\font_end\\ftmp8_3_dm\\JS\\admin\\modifyBookinfo.html?bookId='+book['id']);
        }
      });
    }
  });

  // 管理员查看用户信息
  $("#customer").click(function(event) {
    window.location = './admin_customer.html';
  });

  // $("#book").click(function(event) {
    // $.ajax({
    //   url: "http://localhost:8080/v1/admin/getBookList",
    //   data: {
    //     'offset': 0,
    //     'perPage': 15
    //   },
    //   dataType: 'json',
    //   type: 'post',
    //   async: false,
    //   success: function(data) {
    //     const content = $('#book_content');
    //     const books = data['data'];
    //     const table = create_change_ele('table', {
    //       'class': 'table table-striped'
    //     });
    //     // 生成书籍信息表格
    //     const header = create_change_ele('thead');
    //     // 表头
    //     const head_tr = create_change_ele('tr');
    //     let attrs = ['书名', 'ISBN', '作者', '销量', '页数', '售价'];
    //     for (i in attrs) {
    //       let attr = attrs[i];
    //       let h = create_change_ele('th', {}, attr);
    //       $(h).appendTo(head_tr);
    //     }
    //     $(head_tr).appendTo(header);
    //     $(header).appendTo(table);

    //     // 生成表格
    //     const tbody = create_change_ele('tbody');
    //     for (i in books) {
    //       let book = books[i];
    //       let body_tr = create_change_ele('tr');
    //       let attrs = ['title', 'ISBN', 'author', 'sales', 'page', 'price'];
    //       for (j in attrs) {
    //         let attr = attrs[j];
    //         let th = create_change_ele('th', {}, book[attr]);
    //         $(th).appendTo(body_tr);
    //       }
    //       $(body_tr).appendTo(tbody);
    //     }
    //     $(tbody).appendTo(table);
    //     $(table).appendTo(content);
    //   }
    // });
  // });
});

