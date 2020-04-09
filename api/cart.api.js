const route = require('express').Router();

const Cart = require('../models/cart.model');

const storeCart = async function (req, res, next) {
    const { userId, flowerId, quantity } = req.body;
    let cart = null;
    await Cart.findOne({ 'userId': userId, 'flowerId': flowerId }).exec().then(data => cart = data);
    if (cart == null) {
        let cart = new Cart();
        cart.userId = userId;
        cart.flowerId = flowerId;
        cart.quantity = quantity;
        await cart.save();
    } else {
        await Cart.updateOne({ 'userId': userId, 'flowerId': flowerId }, { 'quantity': cart.quantity + parseInt(quantity) });
    }
    await Cart.find({ 'userId': userId }, (err, carts) => {
        if (err) throw err;
        res.status(200).json({ 'cartQuantity': carts.length });
    });
}

const updateCart = async function (req, res, next) {
    const lstData = req.body;
    await Promise.all(lstData.map(data => {
        return Cart.updateOne({ 'flowerId': data.flowerId }, { 'quantity': data.quantity });
    }));
    res.status(200).json({ 'message': 'Saved' });
}

const deleteCart = async function (req, res, next) {
    await Cart.deleteOne({ 'flowerId': req.params.id });
    res.status(200).json({ 'message': 'Deleted' });
}

route.post('/', storeCart);
route.put('/', updateCart);
route.delete('/:id', deleteCart);

module.exports = route;