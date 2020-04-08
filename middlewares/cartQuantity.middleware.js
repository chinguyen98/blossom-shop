const Cart = require('../models/cart.model');

module.exports.getCartQuantity = async function (req, res, next) {
    if (res.locals.user === null) {
        res.locals.cartQuantity = 0;
        return next();
    }
    await Cart.find({ userId: res.locals.user.id }).then(data => {
        res.locals.cartQuantity = data.length;
        next();
    })
}