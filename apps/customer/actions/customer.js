const kexpress = require('kexpress');
const fs = require('fs');
const Action = kexpress.core.action.Action;
// const WXPay = require('weixin-pay');
const errors = require('../../../config/errors');
const logger = require('ktoolkit').logger.output;
const models = require('../../../models');

const Users = models.Users;
const Bookinfo = models.Bookinfo;
const Basket = models.Basket;
const Orders = models.Orders;
const Remark = models.Remark;

const actionLogin = Action.Create({
  // 检查前端post数据中是否包含username和pwd字段
  prehandlers: {
    request: {
      body: {
        type: 'object',
        required: true,
        properties: {
          username: 'string*'
          // pwd: 'string*'
        }
      }
    },
    response: {
      200: {
        type: 'object',
        required: true
      }
    }
  },
  async handler(req, res) {
    console.log(req.body.username, req.body.password);
    const user = await Users.findOne({
      where: {
        username: req.body.username
      }
    });
    console.log(user);
    // 若找不到用户则报错
    if (user === null) {
      throw new errors.UserNotFound({
        content: `User ${req.body.username} does not exist`
      });
    }
    // console.log('username fine');
    // // 若用户输入的密码与数据库中存储的密码不一致，则报错
    // if (user.get('pwd') !== req.body.pwd) {
    //   throw new errors.WrongPassword({
    //     content: `Passward is wrong`
    //   });
    // }
    res.json({
      successful: true,
      privilige: user.get('privilige'),
      data: {
        userId: user.get('id')
      }
    });
  }
});

const actionRegister = Action.Create({
  // 检查前端post数据中的username和pwd字段
  prehandlers: {
    request: {
      body: {
        type: 'object',
        required: true,
        properties: {
          username: 'string*',
          pwd: 'string*'
        }
      }
    },
    response: {
      200: {
        type: 'object',
        required: true,
        properties: {
          data: {
            type: 'object',
            required: true
          }
        }
      }
    }
  },
  async handler(req, res) {
    let user = await Users.findOne({
      where: {
        username: req.body.username
      }
    });
    // 若用户已存在则报错
    if (user !== null) {
      throw new errors.DupRegisterError({
        content: 'The user has already registered.'
      });
    }

    await Users.create({
      username: req.body.username,
      pwd: req.body.pwd
    });
    res.json({
      successful: true
    });
  }
});

// 获取购物车信息
const actionGetBasket = Action.Create({
  prehandlers: {
    request: {
      body: {
        type: 'object',
        required: true,
        properties: {
          userId: 'string*'
        }
      }
    },
    response: {
      200: {
        type: 'object',
        required: true
      }
    }
  },
  async handler(req, res) {
    const userId = parseInt(req.body.userId);
    const user = await Users.findOne({
      where: {
        id: userId
      }
    });
    if (user === null) {
      throw new errors.UserNotFound({
        content: `User ${req.body.userId} cannot be found`
      });
    }
    const basket = await Basket.findAll({
      where: {
        userId: userId
      }
    });
    const books = [];
    for (i in basket) {
      const book = basket[i];
      const bookinfo = await Bookinfo.findOne({
        where: {
          id: book.get('bookId')
        }
      });
      if (bookinfo === null) {
        throw new errors.BookNotFound({
          content: `Book ${book.get('bookId')} cannot be found`
        });
      }
      books.push({
        'id': bookinfo.get('id'),
        'title': bookinfo.get('title'),
        'ISBN': bookinfo.get('ISBN'),
        'author': bookinfo.get('author'),
        'price': bookinfo.get('price').split('|')[0]
      });
    }
    console.log(books);
    res.json({
      data: books
    });
  }
});

// 想购物车中添加商品
const actionAddBasket = Action.Create({
  prehandlers: {
    request: {
      body: {
        type: 'object',
        required: true,
        properties: {
          userId: 'string*',
          bookId: 'string*'
        }
      }
    },
    response: {
      200: {
        type: 'object',
        required: true
      }
    }
  },
  async handler(req, res) {
    const user = await Users.findOne({
      where: {
        id: req.body.userId
      }
    });
    if (user === null) {
      throw new errors.UserNotFound({
        content: `User ${req.body.userId} cannot be found`
      });
    }
    const book = await Bookinfo.findOne({
      where: {
        id: req.body.bookId
      }
    });
    if (book === null) {
      throw new errors.BookNotFound({
        content: `Book ${req.body.bookId} cannot be found`
      });
    }
    await Basket.create({
      userId: parseInt(req.body.userId),
      bookId: parseInt(req.body.bookId)
    });
    res.json({
      successful: true
    });
  }
});

// 从购物车中移除
const actionRemoveBasket = Action.Create({
  prehandlers: {
    request: {
      body: {
        type: 'object',
        required: true,
        properties: {
          userId: 'string*',
          bookId: 'string*'
        }
      }
    },
    response: {
      200: {
        type: 'object',
        required: true
      }
    }
  },
  async handler(req, res) {
    const user = await Users.findOne({
      where: {
        id: req.body.userId
      }
    });
    if (user === null) {
      throw new errors.UserNotFound({
        content: `User ${req.body.userId} cannot be found`
      });
    }
    const book = await Bookinfo.findOne({
      where: {
        id: req.body.bookId
      }
    });
    if (book === null) {
      throw new errors.BookNotFound({
        content: `Book ${req.body.bookId} cannot be found`
      });
    }
    const basket = await Basket.findOne({
      where: {
        userId: parseInt(req.body.userId),
        bookId: parseInt(req.body.bookId)
      }
    });
    if (basket === null) {
      throw new errors.BasketNotFound({
        content: `Book ${req.body.bookId} does not exist in your basket`
      });
    }
    await Basket.destroy({
      where: {
        userId: parseInt(req.body.userId),
        bookId: parseInt(req.body.bookId)
      }
    });
    res.json({
      successful: true
    });
  }
});

// 获取订单信息
const actionGetOrders = Action.Create({
  prehandlers: {
    request: {
      body: {
        type: 'object',
        required: true,
        properties: {
          userId: 'string'
        }
      }
    },
    response: {
      200: {
        type: 'object',
        required: true
      }
    }
  },
  async handler(req, res) {
    const userId = parseInt(req.body.userId);
    const user = await Users.findOne({
      where: {
        id: userId
      }
    });
    if (user === null) {
      throw new errors.UserNotFound({
        content: `User ${req.body.userId} cannot be found`
      });
    }
    const order_list = await Orders.findAll({
      where: {
        userId: userId
      }
    });

    const orders = [];
    for (i in order_list) {
      const order = order_list[i];
      const bookinfo = await Bookinfo.findOne({
        where: {
          id: order.get('bookId')
        }
      });
      if (bookinfo === null) {
        throw new errors.BookNotFound({
          content: `Book ${book.get('bookId')} cannot be found`
        });
      }
      orders.push({
        'id': order.get('id'),
        'bookId': bookinfo.get('id'),
        'title': bookinfo.get('title'),
        'ISBN': bookinfo.get('ISBN'),
        'author': bookinfo.get('author'),
        'price': bookinfo.get('price').split('|')[0],
        'soldDate': order.get('soldDate')
      });
    }
    console.log('========================');
    console.log(orders);
    res.json({
      data: orders
    });
  }
});

// 完成新订单
const actionNewOrder = Action.Create({
  prehandlers: {
    request: {
      body: {
        type: 'object',
        required: true,
        properties: {
          userId: 'string',
          bookIds: 'string'
        }
      }
    },
    response: {
      200: {
        type: 'object',
        required: true
      }
    }
  },
  async handler(req, res) {
    const userId = parseInt(req.body.userId);
    const bookIds = JSON.parse(req.body.bookIds);
    const user = await Users.findOne({
      where: {
        id: userId
      }
    });
    if (user === null) {
      throw new errors.UserNotFound({
        content: `User ${userId} cannot be found`
      });
    }
    // const bookIds = [];
    for (i in bookIds) {
      const bookId = parseInt(bookIds[i]);
      const book = await Bookinfo.findOne({
        where: {
          id: bookId
        }
      });
      if (book === null) {
        throw new errors.BookNotFound({
          content: `Book ${bookId} cannot be found`
        });
      }
      await Orders.create({
        userId: userId,
        bookId: bookId,
        soldDate: Date.now(),
        status: 'Finished'
      });
      const pram = {
        'sales': book.get('sales')
      };
      await Bookinfo.update(
        pram, {
          where: {
            id: bookId
          }
        }
      );
      await Basket.destroy({
        where: {
          userId: userId
        }
      });
    }

    res.json({
      successful: true
    });
  }
});

const actionFinishOrder = Action.Create({
  prehandlers: {
    request: {
      body: {
        type: 'object',
        required: true,
        properties: {
          userId: 'integer',
          bookId: 'integer'
        }
      }
    },
    response: {
      200: {
        type: 'object',
        required: true
      }
    }
  },
  async handler(req, res) {
    const user = await Users.findOne({
      where: {
        id: req.body.userId
      }
    });
    if (user === null) {
      throw new errors.UserNotFound({
        content: `User ${req.body.userId} cannot be found`
      });
    }
    const book = await Bookinfo.findOne({
      where: {
        id: req.body.bookId
      }
    });
    if (book === null) {
      throw new errors.BookNotFound({
        content: `Book ${req.body.bookId} cannot be found`
      });
    }
    let order = await Orders.findOne({
      where: {
        userId: req.body.userId,
        bookId: req.body.bookId
      }
    });
    if (order === null) {
      throw new errors.OrderNotFound({
        content: `Order cannot be found`
      });
    }
    if (order.get('status') !== 'Unifinished') {
      throw new errors.OrderFinished({
        content: `Order has been finished`
      });
    }
    const pram = {
      'status': 'Finished'
    }
    await Orders.update(
      pram, {
        where: {
          userId: req.body.userId,
          bookId: req.body.bookId
        }
      }
    );
    res.json({
      successful: true
    });
  }
});

const actionGetBookList = Action.Create({
  // 检查前端post数据中的type, offset和perPage字段
  prehandlers: {
    request: {
      body: {
        type: 'object',
        required: true,
        properties: {
          offset: {
            type: 'string',
            required: true
          },
          perPage: {
            type: 'string',
            required: false
          }
        }
      }
    },
    response: {
      200: {
        type: 'object',
        required: true
      }
    }
  },
  async handler(req, res) {
    // 分页，提供每页的数量和开始处
    const perPage = !req.body.perPage ? 10 : parseInt(req.body.perPage);
    const offset = !req.body.offset ? 0 : parseInt(req.body.offset) * perPage;
    const books = await Bookinfo.findAll({
      order: [
        ['id', 'DESC']
      ],
      where: {
        type: req.body.type
      },
      limit: perPage,
      offset: offset
    });

    res.json({
      data: books
    });
  }
});

const actionGetBookinfo = Action.Create({
  // 检查前端post数据中bookId字段
  prehandlers: {
    request: {
      body: {
        type: 'object',
        required: true,
        properties: {
          bookId: {
            type: 'string',
            required: true
          }
        }
      }
    },
    response: {
      200: {
        type: 'object',
        required: false
      }
    }
  },
  async handler(req, res) {
    console.log(req.body.bookId);
    // 分页，提供每页的数量和开始处
    const book = await Bookinfo.findOne({
      where: {
        id: parseInt(req.body.bookId)
      }
    });
    // 若找不到该书籍，则报错
    if (book === null) {
      throw new errors.BookNotFound({
        content: `Book No${req.body.bodyId} not found`
      });
    }
    const info_path = 'F:/eBookshop/make-money_v1/crawler/allBook/';
    const content = fs.readFileSync(info_path + book['ISBN'] + '/Deatails.txt');
    console.log(book['title']);
    res.json({
      data: {
        'ISBN': book.get('ISBN'),
        'title': book.get('title'),
        'author': book.get('author'),
        'language': book.get('language'),
        'version': book.get('version'),
        'price': book.get('price'),
        'type': book.get('type'),
        'page': book.get('page'),
        'weight': book.get('weight'),
        'size': book.get('size'),
        'press': book.get('press'),
        'timeOnline': book.get('timeOnline'),
        'book_details': content.toString()
      }
    });
  }
});

const actionGetAccount = Action.Create({
  // 检查前端post数据中的userId字段
  prehandlers: {
    request: {
      body: {
        type: 'object',
        required: true,
        properties: {
          userId: {
            type: 'string',
            required: true
          }
        }
      }
    },
    response: {
      200: {
        type: 'object',
        required: false
      }
    }
  },
  async handler(req, res) {
    const userId = parseInt(req.body.userId);
    // 分页，提供每页的数量和开始处
    const user = await Users.findOne({
      where: {
        id: userId
      }
    });
    // 若找不到该用户就报错
    if (user === null) {
      throw new errors.BookNotFound({
        content: `User No.${userId} not found`
      });
    }
    res.json({
      data: {
        'username': user.get('username'),
        'name': user.get('name'),
        'email': user.get('email')
      }
    });
  }
});

// 更换密码
const actionChangePassword = Action.Create({
  // 检查前端post数据中的userId和password字段
  prehandlers: {
    request: {
      body: {
        type: 'object',
        required: true,
        properties: {
          userId: {
            type: 'string',
            required: true
          },
          password: {
            type: 'string',
            required: true
          }
        }
      }
    },
    response: {
      200: {
        type: 'object',
        required: false
      }
    }
  },
  async handler(req, res) {
    const userId = parseInt(req.body.userId);
    // 分页，提供每页的数量和开始处
    const user = await Users.findOne({
      where: {
        id: userId
      }
    });
    if (user === null) {
      throw new errors.BookNotFound({
        content: `User No.${userId} not found`
      });
    }
    const pram = {
      'pwd': req.body.password
    }
    await Users.update(
      pram, {
        where: {
          id: userId
        }
      }
    );
    res.json({
      successful: true
    });
  }
});

// 更新用户信息
const actionModifyAccount = Action.Create({
  // 检查前端post数据中的userId, username, name和email字段
  prehandlers: {
    request: {
      body: {
        type: 'object',
        required: true,
        properties: {
          userId: {
            type: 'string',
            required: true
          },
          username: {
            type: 'string',
            required: true
          },
          name: {
            type: 'string',
            required: true
          },
          email: {
            type: 'string',
            required: true
          }
        }
      }
    },
    response: {
      200: {
        type: 'object',
        required: false
      }
    }
  },
  async handler(req, res) {
    const userId = parseInt(req.body.userId);
    // 分页，提供每页的数量和开始处
    const user = await Users.findOne({
      where: {
        id: userId
      }
    });
    if (user === null) {
      throw new errors.BookNotFound({
        content: `User No.${userId} not found`
      });
    }
    const pram = {
      'username': req.body.username,
      'name': req.body.name,
      'email': req.body.email
    }
    await Users.update(
      pram, {
        where: {
          id: userId
        }
      }
    );
    res.json({
      successful: true
    });
  }
});

const actionGetSorted = Action.Create({
  prehandlers: {
    request: {
      body: {
        type: 'object',
        required: true,
        properties: {
          type: {
            type: 'string',
            required: true
          }
        }
      }
    },
    response: {
      200: {
        type: 'object',
        required: true
      }
    }
  },
  async handler(req, res) {
    // 分页，提供每页的数量和开始处
    const perPage = 3;
    // const offset = !req.body.offset ? 0 : parseInt(req.body.offset) * perPage;
    const books = await Bookinfo.findAll({
      order: [
        ['sales', 'DESC']
      ],
      where: {
        type: req.body.type
      },
      limit: perPage
      // offset: offset
    });

    res.json({
      data: books
    });
  }
});

const actionSearch = Action.Create({
  // 检查前端post数据中bookId字段
  prehandlers: {
    request: {
      body: {
        type: 'object',
        required: true,
        properties: {
          searchStr: 'string*'
        }
      }
    },
    response: {
      200: {
        type: 'object',
        required: false
      }
    }
  },
  async handler(req, res) {
    const book = await Bookinfo.findOne({
      where: {
        title: {
          $like: '%' + req.body.searchStr + '%'
        }
      }
    });
    console.log(book.get());
    res.json({
      data: book.get()
    });
  }
});

const actionTest = Action.Create({
  async handler(req, res) {
    // 分页，提供每页的数量和开始
    // const user = await Users.findAll();
    console.log(user);
    res.json({
      data: 'hello'
    });
  }
});

module.exports = {
  actionLogin,
  actionRegister,
  actionAddBasket,
  actionNewOrder,
  actionFinishOrder,
  actionGetBookList,
  actionGetBookinfo,
  actionGetBasket,
  actionGetOrders,
  actionRemoveBasket,
  actionGetAccount,
  actionChangePassword,
  actionModifyAccount,
  actionGetSorted,
  actionSearch,
  actionTest
};

