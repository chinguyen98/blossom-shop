const Cart = require('../models/cart.model');
const Order = require('../models/order.model');

module.exports.renderOrderPage = (req, res, next) => {

}

module.exports.storeOrder = (req, res, next) => {
    console.log(res.locals.user.id);
    res.send(req.body.cart);
}