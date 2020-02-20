const route = require('express').Router();

const homeController = require('../controllers/home.controller');
const auth = require('../middlewares/auth.middleware');

route.get('/', homeController.renderHomePage);

route.get('/carts', auth.ensureUserAuthenticated, homeController.renderCartPage);

route.get('/flowers/:id', homeController.renderFlowerDetailPage);

module.exports = route;