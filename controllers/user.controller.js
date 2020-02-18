module.exports.renderUserLoginPage = function (req, res, next) {
    res.render('user/login', { 'title': 'Login' });
}