const route = require('express').Router();

const userController = require('../controllers/user.controller');
const auth = require('../middlewares/auth.middleware');

route.get('/', auth.ensureUserAuthenticated, userController.renderUserPage);

route.get('/login', auth.redirectIfUserAuthenticated, userController.renderUserLoginPage);

route.get('/register', auth.redirectIfUserAuthenticated, userController.renderUserRegisterPage);

route.post('/register', userController.registerUser);

route.post('/login', auth.userAuthentication);

module.exports = route;