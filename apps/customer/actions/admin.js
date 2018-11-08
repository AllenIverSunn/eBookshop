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
          username: 'string*',
          pwd: 'string*'
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
    // if (req.body.username !== 'admin') {
      // throw new errors.AdminError({
      //   content: `Not Admin`
      // });
    // }
    const user = await Users.findOne({
      where: {
        username: req.body.username
      }
    });
    if (user.get('privilige') !== 'admin') {
      throw new errors.AdminError({
        content: `Not Admin`
      });
    }
    // if (user.get('pwd') !== req.body.pwd) {
    //   throw new errors.WrongPassword({
    //     content: `Passward is wrong`
    //   });
    // }
    console.log(user);
    // 若找不到用户则报错
    // console.log('username fine');
    // // 若用户输入的密码与数据库中存储的密码不一致，则报错
    // if (user.get('pwd') !== req.body.pwd) {
    //   throw new errors.WrongPassword({
    //     content: `Passward is wrong`
    //   });
    // }
    res.json({
      successful: true
    });
  }
});

const actionDeleteCustomer = Action.Create({
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
    try {
      await Users.destroy({
        where: {
          id: userId
        }
      });
    } catch (err) {
      res.json({
        successful: false
      })
    }
    res.json({
      successful: true
    });
  }
});

const actionAddBook = Action.Create({
  prehandlers: {
    request: {
      body: {
        type: 'object',
        required: true,
        properties: {
          ISBN: 'string*',
          title: 'string*',
          author: 'string*',
          language: 'string*',
          ASIN: 'string*',
          version: 'string*',
          price: 'string*',
          type: 'string*',
          shapeCode: {
            type: 'string',
            required: false
          },
          page: 'string*',
          weight: 'string*',
          size: 'string*',
          press: 'string*',
          timeOnline: {
            type: 'string*',
            required: false
          },
          sales: {
            type: 'integer',
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
    const book_test = await Bookinfo.findOne({
      where: {
        title: req.body.title
      }
    });
    if (book !== null) {
      throw new errors.BookExisted({
        content: `Book ${req.body.title} exists`
      });
    }
    const book = await Bookinfo.create(req.body);
    res.json({
      successful: true
    });
  }
});

const actionDeleteBook = Action.Create({
  prehandlers: {
    request: {
      body: {
        type: 'object',
        required: true,
        properties: {
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
    const bookId = parseInt(req.body.bookId);
    // console.log(bookId);
    const book = await Bookinfo.findOne({
      where: {
        id: bookId
      }
    });
    if (book === null) {
      throw new errors.BookNotFound({
        content: `Book ${req.body.bookId} cannot be found`
      });
    }
    try {
      await Bookinfo.destroy({
        where: {
          id: bookId
        }
      });
    } catch (err) {
      res.json({
        successful: false
      });
    }
    res.json({
      successful: true
    });
  }
});

const actionModifyBook = Action.Create({
  prehandlers: {
    request: {
      body: {
        type: 'object',
        required: true,
        properties: {
          bookId: 'string*',
          ISBN: {
            type: 'string',
            required: false
          },
          title: {
            type: 'string',
            required: false
          },
          author: {
            type: 'string',
            required: false
          },
          language: {
            type: 'string',
            required: false
          },
          ASIN: {
            type: 'string',
            required: false
          },
          version: {
            type: 'string',
            required: false
          },
          price: {
            type: 'string',
            required: false
          },
          type: {
            type: 'string',
            required: false
          },
          shapeCode: {
            type: 'string',
            required: false
          },
          page: {
            type: 'string',
            required: false
          },
          weight: {
            type: 'string',
            required: false
          },
          size: {
            type: 'string',
            required: false
          },
          press: {
            type: 'string',
            required: false
          },
          timeOnline: {
            type: 'string',
            required: false
          },
          sales: {
            type: 'integer',
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
    console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
    console.log(req.body);
    await Bookinfo.update(
      req.body, {
        where: {
          id: req.body.bookId
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

const actionGetCustomer = Action.Create({
  // 检查前端post数据中bookId字段
  prehandlers: {
    request: {
      body: {
        type: 'object',
        required: true,
        properties: {}
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
    // 分页，提供每页的数量和开始处
    const customers = await Users.findAll();
    // 若找不到该书籍，则报错
    let users = [];
    for (i in customers) {
      users.push(customers[i].get());
    }
    res.json({
      data: users
    });
  }
});

const actionFindCustomer = Action.Create({
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
    const user = await Users.findOne({
      where: {
        username: {
          $like: '%' + req.body.searchStr + '%'
        }
      }
    });
    // console.log(book.get());
    res.json({
      data: user.get()
    });
  }
});


// 更新用户信息
const actionModifyCustomer = Action.Create({
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
          },
          privilige: {
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
      'email': req.body.email,
      'privilige': req.body.privilige
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

module.exports = {
  actionLogin,
  actionDeleteCustomer,
  actionAddBook,
  actionDeleteBook,
  actionModifyBook,
  actionGetBookList,
  actionGetBookinfo,
  actionModifyCustomer,
  actionGetCustomer,
  actionGetSorted
};

