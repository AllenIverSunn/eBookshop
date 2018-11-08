const kexpress = require('kexpress');
const Router = kexpress.core.router.Router;
const router = new Router();
const actions = require('../actions/customer');
const admin_actions = require('../actions/admin');


router.post('/login', actions.actionLogin);
router.post('/register', actions.actionRegister);
router.post('/book_list', actions.actionGetBookList);
router.post('/bookinfo', actions.actionGetBookinfo);
router.post('/addBasket', actions.actionAddBasket);
router.post('/newOrder', actions.actionNewOrder);
router.post('/finishOrder', actions.actionFinishOrder);
router.post('/getBasket', actions.actionGetBasket);
router.post('/getOrders', actions.actionGetOrders);
router.post('/removeBasket', actions.actionRemoveBasket);
router.post('/getAccount', actions.actionGetAccount);
router.post('/changePassword', actions.actionChangePassword);
router.post('/modifyAccount', actions.actionModifyAccount);
router.post('/getSorted', actions.actionGetSorted);
router.post('/search', actions.actionSearch);
router.get('/test', actions.actionTest);

//admin
router.post('/admin/login', admin_actions.actionLogin);
router.post('/admin/deleteCustomer', admin_actions.actionDeleteCustomer);
router.post('/admin/addBook', admin_actions.actionAddBook);
router.post('/admin/deleteBook', admin_actions.actionDeleteBook);
router.post('/admin/modifyBook', admin_actions.actionModifyBook);
router.post('/admin/getBookList', admin_actions.actionGetBookList);
router.post('/admin/getBookInfo', admin_actions.actionGetBookinfo);
router.post('/admin/modifyCustomer', admin_actions.actionModifyCustomer);
router.post('/admin/getSorted', admin_actions.actionGetSorted);
router.post('/admin/getCustomer', admin_actions.actionGetCustomer);
module.exports = {
  router: router
};
