module.exports.renderAdminHomePage = function (req, res, next) {
    res.render('admin/index', { 'title': 'Admin Page', layout: 'layouts/admin.layout.ejs' });
}

module.exports.renderAdminLoginPage = function (req, res, next) {
    res.render('admin/login', { 'title': 'Admin Login', layout: 'layouts/admin.layout.ejs' })
}