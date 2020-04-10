const route = require('express').Router();

const cartControler = require('../controllers/order.controller');

route.get('/', cartControler.renderOrderPage);

route.post('/', cartControler.storeOrder);

module.exports = route;