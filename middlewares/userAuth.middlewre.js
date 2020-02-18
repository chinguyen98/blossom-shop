const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const User = require('../models/user.model');

module.exports.ensureAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

module.exports.redirectIfAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        res.redirect('/user');
    } else {
        return next();
    }
}

module.exports.authentication = passport.authenticate('local', {
    successRedirect: '/user',
    successFlash: 'Login successfully!',
    failureRedirect: '/login',
    failureMessage: 'Incorrect email or password!'
});

passport.serializeUser(function (user, done) {
    return done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, (err, user) => {
        done(err, user);
    })
});

passport.use(new localStrategy({ usernameField: 'email' }, (email, password, done) => {
    //Match Admin
    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                return done(null, false);
            }
            //If match admin, check match password
            if (!user.validPassword(password)) {
                return done(null, false);
            }
            return done(null, user);
        })
        .catch(err => console.log(err));
}));