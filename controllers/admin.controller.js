const Admin = require('../models/admin.model');
const Category = require('../models/category.model');

module.exports.renderAdminHomePage = function (req, res, next) {
    res.render('admin/index', { 'title': 'Admin Page', layout: 'layouts/admin.layout.ejs' });
}

module.exports.renderAdminLoginPage = function (req, res, next) {
    res.render('admin/login', { 'title': 'Admin Login', layout: 'layouts/admin.layout.ejs' });
}

module.exports.renderAdminRegisterPage = function (req, res, next) {
    res.render('admin/register', { 'title': 'Admin Register', layout: 'layouts/admin.layout.ejs' });
}

module.exports.renderAdminManageBlossomsPage = function (req, res, next) {
    res.render('admin/blossom', { 'title': 'Blossom Management', layout: 'layouts/admin.layout.ejs' });
}

module.exports.renderAdminManageCategoriesPage = function (req, res, next) {
    res.render('admin/category', { 'title': 'Category Management', layout: 'layouts/admin.layout.ejs' });
}

module.exports.registerAdmin = function (req, res, next) {
    const { name, email, password } = req.body;

    Admin.findOne({ email: email }, (err, user) => {
        if (err) throw err;
        if (user) {
            req.flash('msg-valid-err', 'Email has been taken!');
            res.location('/admins/register');
            res.redirect('/admins/register');
        } else {
            let newAdmin = new Admin();
            newAdmin.name = name;
            newAdmin.email = email;
            newAdmin.password = newAdmin.encryptPassword(password);
            newAdmin.save().then((admin) => console.log(admin));
            req.flash('msg-success', 'Register successfully!');
            res.location('/admins/login');
            res.redirect('/admins/login');
        }
    });
}
module.exports.addNewCategory = function (req, res, next) {
    const name = req.body.name;
    let category = new Category();
    category.name = name;
    category.save();
    req.flash('msg-success', `Add "${name}" successfully!`);
    res.location('/admins/manage/categories');
    res.redirect('/admins/manage/categories');
}