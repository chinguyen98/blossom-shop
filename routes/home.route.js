const route = require('express').Router();

const homeController = require('../controllers/home.controller');

route.get('/', homeController.renderHomePage);

module.exports = route;