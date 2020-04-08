const route = require('express').Router();

const homeController = require('../controllers/home.controller');
const auth = require('../middlewares/auth.middleware');
const getCartQuantityMiddleware = require('../middlewares/cartQuantity.middleware').getCartQuantity;

route.get('/', getCartQuantityMiddleware, homeController.renderHomePage);

route.get('/carts', auth.ensureUserAuthenticated, getCartQuantityMiddleware, homeController.renderCartPage);

route.get('/flowers/:id', getCartQuantityMiddleware, homeController.renderFlowerDetailPage);

module.exports = route;