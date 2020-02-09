const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const Admin = require('../models/admin.model');

module.exports.ensureAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/admins/login');
}

module.exports.redirectIfAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        res.redirect('/admins');
    } else {
        return next();
    }
}

module.exports.authentication = passport.authenticate('local', {
    successRedirect: '/admins',
    failureRedirect: '/admins/login',
    failureFlash: 'Incorrect email or password!',
    successFlash: 'Login successfully!',
});

passport.serializeUser(function (admin, done) {
    return done(null, admin.id);
});

passport.deserializeUser(function (id, done) {
    Admin.findById(id, (err, admin) => {
        done(err, admin);
    })
});

passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    //Match Admin
    Admin.findOne({ email: email })
        .then(admin => {
            if (!admin) {
                return done(null, false);
            }
            //If match admin, check match password
            if (!admin.validPassword(password)) {
                return done(null, false);
            }
            return done(null, admin);
        })
        .catch(err => console.log(err));
}));