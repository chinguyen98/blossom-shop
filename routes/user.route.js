const route = require('express').Router();

const userController = require('../controllers/user.controller');

route.get('/login', userController.renderUserLoginPage);

route.get('/register', userController.renderUserRegisterPage);

module.exports = route;