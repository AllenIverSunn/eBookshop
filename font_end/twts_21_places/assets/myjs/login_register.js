// 登录
$("button[name='login']").click(function () {
  const username = $("input[name='username']").val();
  const pwd = $("input[name='pwd']").val();
  if (username === null) {
    alert("Username cannot be null");
    return;
  }
  if (pwd === null) {
    alert("Password cannot be null");
    return;
  }
  const data = {
    'username': username,
    // 'pwd': hex_md5(pwd)
    'pwd': pwd
  };
  // alert(JSON.stringify(data));
  let userId = null;
  // if (username === 'admin') {
  // $.post('http://localhost:8080/v1/admin/login', data, function (data, status) {
  //   if (data['success'] === false) {
  //     alert("Username or password error.");
  //     return;
  //   }
  //   // const userId = data['data']['userId'];
  //   // 加一个登录成功后的重定向
  //   window.open('F:\\eBookshop\\eBookshop\\font_end\\ftmp8_3_dm\\JS\\admin\\admin_book.html');
  // });
  // } else {
  //   $.post('http://localhost:8080/v1/login', data, function (data, status) {
  //     if (data['success'] === false) {
  //       alert("Username or password error.");
  //       return;
  //     }
  //     const userId = data['data']['userId'];
  //     // 加一个登录成功后的重定向
  //     window.open('F:\\eBookshop\\eBookshop\\font_end\\ftmp8_3_dm\\book_sorts_list.html?userId='+userId)
  //   });
  // }
  $.post('http://localhost:8080/v1/login', data, function (data, status) {
    if (data['success'] === false) {
      alert("Username or password error.");
      return;
    }
    if (data['privilige'] === 'normal') {
      const userId = data['data']['userId'];
      window.open('F:\\eBookshop\\eBookshop\\font_end\\ftmp8_3_dm\\book_sorts_list.html?userId=' + userId);
    } else {
      window.open('F:\\eBookshop\\eBookshop\\font_end\\ftmp8_3_dm\\JS\\admin\\admin_book.html');
    }

    // 加一个登录成功后的重定向

  });
});

// 注册
$("button[name='register']").click(function () {
  const username = $("input[name='username']").val();
  const pwd = $("input[name='pwd']").val();
  if (username === null) {
    alert("Username cannot be null");
    return;
  }
  if (pwd === null) {
    alert("Password cannot be null");
    return;
  }
  const data = {
    'username': username,
    // 'pwd': hex_md5(pwd)
    'pwd': pwd
  };
  $.post('http://localhost:8080/v1/register', data, function (data, status) {
    if (data['success'] === false) {
      alert("Username or password error.");
      return;
    }
    // 加一个登录成功后的重定向
    alert('注册成功');
  });
});