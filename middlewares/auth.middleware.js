const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const ADMIN = 0;
const USER = 1;

const User = require('../models/user.model');
const Admin = require('../models/admin.model');

module.exports.adminAuthentication = passport.authenticate('admin', {
    successRedirect: '/admins',
    failureRedirect: '/admins/login',
    failureFlash: 'Incorrect email or password!',
    successFlash: 'Login successfully!',
});

module.exports.userAuthentication = function (req, res, next) {
    passport.authenticate('user', function (err, user, info) {
        let flowerPath = req.body.flowerPath;
        if (err) throw err;
        if (!user) {
            res.redirect('/users/login');
        }
        req.login(user, function (err) {
            if (err) throw err;
            req.flash('msg-success', 'Login successfully!');
            if (flowerPath == '') {
                return res.redirect('/users');
            }
            else {
                return res.redirect(flowerPath);
            }
        });
    })(req, res, next);
}

passport.use('user', new localStrategy({ usernameField: 'email' }, (email, password, done) => {
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

passport.use('admin', new localStrategy({ usernameField: 'email' }, (email, password, done) => {
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

passport.serializeUser(function (entity, done) {
    return done(null, { id: entity.id, type: entity.type });
});

passport.deserializeUser(function (obj, done) {
    switch (obj.type) {
        case ADMIN: {
            Admin.findById(obj.id, (err, admin) => {
                done(null, admin);
            });
            break;
        }
        case USER: {
            User.findById(obj.id, (err, user) => {
                done(err, user);
            });
            break;
        }
    }
});

module.exports.ensureAdminAuthenticated = function (req, res, next) {
    if (req.isAuthenticated() && req.user.type == ADMIN) {
        return next();
    }
    res.redirect('/admins/login');
}

module.exports.redirectIfAdminAuthenticated = function (req, res, next) {
    if (req.isAuthenticated() && req.user.type == ADMIN) {
        res.redirect('/admins');
    } else {
        return next();
    }
}

module.exports.ensureUserAuthenticated = function (req, res, next) {
    if (req.isAuthenticated() && req.user.type == USER) {
        return next();
    }
    if (req.route.path == '/carts') {
        req.flash('msg-notify', 'Please login first!');
    }
    res.location('/users/login');
    res.redirect('/users/login');
}

module.exports.redirectIfUserAuthenticated = function (req, res, next) {
    if (req.isAuthenticated() && req.user.type == USER) {
        res.redirect('/users');
    } else {
        return next();
    }
}