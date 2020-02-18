const route = require('express').Router();

const userController = require('../controllers/user.controller');

route.get('/login', userController.renderUserLoginPage);

route.get('/register', userController.renderUserRegisterPage);

route.post('/register', userController.registerUser);

module.exports = route;