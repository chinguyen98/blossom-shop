const Category = require('../models/category.model');
const Flower = require('../models/flower.model');

module.exports.renderHomePage = function (req, res, next) {
    Flower.find({}, (err, flowers) => {
        if (err) throw err;
        res.render('home/index', { 'title': 'Blossom Shop', 'flowers': flowers });
    })
}

module.exports.renderCartPage = function (req, res, next) {
    res.render('home/cart', { 'title': 'Cart' });
}