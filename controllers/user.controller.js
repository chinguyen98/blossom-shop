module.exports.renderUserLoginPage = function (req, res, next) {
    res.render('user/login', { 'title': 'Login' });
}

module.exports.renderUserRegisterPage = function (req, res, next) {
    res.render('user/register', { 'title': 'Register' });
}