module.exports.renderHomePage = function (req, res, next) {
    res.render('home/index', { 'title': 'Blossom Shop' });
}