const Category = require('../models/category.model');
const Flower = require('../models/flower.model');
const Cart = require('../models/cart.model');

module.exports.renderHomePage = function (req, res, next) {
    Flower.find({}, (err, flowers) => {
        if (err) throw err;
        res.render('home/index', { 'title': 'Blossom Shop', 'flowers': flowers, 'cartQuantity': res.locals.cartQuantity });
    });
}

module.exports.renderCartPage = async function (req, res, next) {
    let carts = null;
    let flowers = null;

    await Cart.find({ 'userId': req.user.id }).exec().then(data => carts = data);

    await Promise.all(carts.map(cart => {
        return Flower.findById(cart.flowerId).exec();
    })).then(data => { flowers = data });

    let detailCart = [];
    carts.forEach((cart, index) => {
        detailCart.push({ 'flowerName': flowers[index].name, 'flowerImage': flowers[index].image, 'flowerPrice': flowers[index].price, 'quantity': cart.quantity });
    })

    res.render('home/cart', { 'title': 'Cart', 'carts': detailCart, 'cartQuantity': res.locals.cartQuantity });
}

module.exports.renderFlowerDetailPage = function (req, res, next) {
    Flower.findById(req.params.id, (err, flower) => {
        res.render('home/flower', { 'title': 'Flower', 'flower': flower, 'cartQuantity': res.locals.cartQuantity });
    });
}