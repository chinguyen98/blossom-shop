const route = require('express').Router();

const Cart = require('../models/cart.model');

const storeCart = async function (req, res, next) {
    const { userId, flowerId, quantity } = req.body;
    const cart = new Cart();
    cart.userId = userId;
    cart.flowerId = flowerId;
    cart.quantity = quantity;
    await cart.save();
    await Cart.find({ 'userId': userId }, (err, carts) => {
        if (err) throw err;
        res.status(200).json({ 'cartQuantity': carts.length });
    });
}

route.post('/', storeCart);

module.exports = route;