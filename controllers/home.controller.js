module.exports.renderHomePage = function (req, res, next) {
    res.render('home', { 'title': 'Blossom Shop' });
}