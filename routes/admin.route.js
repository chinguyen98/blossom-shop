const route = require('express').Router();
const passport = require('passport');

const adminController = require('../controllers/admin.controller');
const adminAuth = require('../middlewares/adminAuth.middleware');

route.get('/', adminAuth.ensureAuthenticated, adminController.renderAdminHomePage);

route.get('/login', adminAuth.redirectIfAuthenticated, adminController.renderAdminLoginPage);

route.get('/register', adminAuth.redirectIfAuthenticated, adminController.renderAdminRegisterPage);

route.get('/manage/blossoms', adminController.renderAdminManageBlossomsPage);

route.get('/manage/categories', adminController.renderAdminManageCategoriesPage);

route.post('/register', adminController.registerAdmin);

route.post('/login', adminAuth.authentication);

route.post('/manage/categories/add', adminController.addNewCategory);

module.exports = route;