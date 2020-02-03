module.exports.renderAdminPage = function (req, res, next) {
    res.render('admin/index', { 'title': 'Admin Page' });
}