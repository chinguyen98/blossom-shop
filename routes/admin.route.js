const route = require('express').Router();

const adminController = require('../controllers/admin.controller');

route.get('/', adminController.renderAdminHomePage);

route.get('/login', adminController.renderAdminLoginPage);

module.exports = route;