const route = require('express').Router();

const userController = require('../controllers/user.controller');
const auth = require('../middlewares/auth.middleware');

route.get('/', auth.ensureUserAuthenticated, userController.renderUserPage);

route.get('/login', auth.redirectIfUserAuthenticated, userController.renderUserLoginPage);

route.get('/register', auth.redirectIfUserAuthenticated, userController.renderUserRegisterPage);

route.get('/logout', userController.logout);

route.post('/register', userController.registerUser);

route.post('/login', auth.userAuthentication);

route.post('/carts', userController.cacheFlowerPath, userController.renderUserLoginPage, auth.userAuthentication);

module.exports = route;