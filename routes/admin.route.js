const route = require('express').Router();

const adminController = require('../controllers/admin.controller');

route.get('/', adminController.renderAdminHomePage);

route.get('/login', adminController.renderAdminLoginPage);

route.get('/register', adminController.renderAdminRegisterPage);

route.post('/register', adminController.registerAdmin);

module.exports = route;