const User = require('../models/user.model');

module.exports.renderUserPage = function (req, res, next) {
    res.render('user/index', { 'title': 'Hello', 'cartQuantity': res.locals.cartQuantity });
}

module.exports.renderUserLoginPage = function (req, res, next) {
    res.render('user/login', { 'title': 'Login', 'flowerPath': req.body.flowerPath || '', 'cartQuantity': res.locals.cartQuantity });
}

module.exports.renderUserRegisterPage = function (req, res, next) {
    res.render('user/register', { 'title': 'Register', 'cartQuantity': res.locals.cartQuantity });
}

module.exports.registerUser = function (req, res, next) {
    const { name, email, password, phone, address } = req.body;
    User.findOne({ email: email }, (err, user) => {
        if (err) throw err;
        if (user) {
            req.flash('msg-valid-err', 'Email has been taken!');
            res.location('/users/register');
            res.redirect('/users/register');
        } else {
            let newUser = new User();
            newUser.name = name;
            newUser.email = email;
            newUser.phone = phone;
            newUser.address = address;
            newUser.password = newUser.encryptPassword(password);
            newUser.save();
            req.flash('msg-success', 'Register successfully!');
            res.location('/users/login');
            res.redirect('/users/login');
        }
    });
}

module.exports.cacheFlowerPath = function (req, res, next) {
    res.locals.flowerPath = req.body.flowerPath;
    req.flash('msg-notify', 'Please login before order!');
    next();
}

module.exports.logout = function (req, res, next) {
    req.logout();
    res.redirect('/');
}