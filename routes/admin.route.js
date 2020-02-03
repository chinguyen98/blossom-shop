const route = require('express').Router();

const adminController = require('../controllers/admin.controller');

route.get('/', adminController.renderAdminPage);

module.exports = route;