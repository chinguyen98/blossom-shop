const Admin = require('../models/admin.model');
const Category = require('../models/category.model');
const Flower = require('../models/flower.model');

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
    Category.find({}, (err, categories) => {
        if (err) throw err;
        categories = categories.sort(function (a, b) {
            if (a.name < b.name) { return -1; }
            if (a.name > b.name) { return 1; }
            return 0;
        });
        res.render('admin/blossom', { 'title': 'Blossom Management', 'categories': categories, layout: 'layouts/admin.layout.ejs' });
    });
}

module.exports.renderAdminManageCategoriesPage = function (req, res, next) {
    Category.find({}, (err, categories) => {
        if (err) throw err;
        categories = categories.sort(function (a, b) {
            if (a.name < b.name) { return -1; }
            if (a.name > b.name) { return 1; }
            return 0;
        });
        res.render('admin/category', { 'title': 'Category Management', 'categories': categories, layout: 'layouts/admin.layout.ejs' });
    });
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

module.exports.editAndDeleteCategory = function (req, res, next) {
    const name = req.body.name;
    if (req.body.editBtn != undefined) {
        Category.findById(req.params.id, (err, category) => {
            if (err) throw err;
            category.name = name;
            category.save();
            req.flash('msg-success', `Edit "${name}" successfully!`);
            res.location('/admins/manage/categories');
            res.redirect('/admins/manage/categories');
        })
    } else {
        Category.findByIdAndDelete(req.params.id, (err) => {
            if (err) throw err;
            req.flash('msg-success', `Delete "${name}" successfully!`);
            res.location('/admins/manage/categories');
            res.redirect('/admins/manage/categories');
        })
    }
}

module.exports.addNewFlower = function (req, res, next) {
    const { name, price, categoryId } = req.body;
    const image = req.file.filename;
    const newFlower = new Flower();
    newFlower.name = name;
    newFlower.price = price;
    newFlower.image = image;
    newFlower.categoryId = categoryId;

    newFlower.save();
    req.flash('msg-success', `Add "${name}" successfully!`);
    res.location('/admins/manage/blossoms');
    res.redirect('/admins/manage/blossoms');
}