const User = require('../models/user.model');

module.exports.renderUserPage = function (req, res, next) {
    res.render('user/index', { 'title': 'Hello' });
}

module.exports.renderUserLoginPage = function (req, res, next) {
    res.render('user/login', { 'title': 'Login' });
}

module.exports.renderUserRegisterPage = function (req, res, next) {
    res.render('user/register', { 'title': 'Register' });
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