const route = require('express').Router();
const multer = require('multer');
const upload = multer({ dest: './public/images/flowers/' });

const adminController = require('../controllers/admin.controller');
const adminAuth = require('../middlewares/adminAuth.middleware');

route.get('/', adminAuth.ensureAuthenticated, adminController.renderAdminHomePage);

route.get('/login', adminAuth.redirectIfAuthenticated, adminController.renderAdminLoginPage);

route.get('/register', adminAuth.ensureAuthenticated, adminController.renderAdminRegisterPage);

route.get('/manage/blossoms', adminAuth.ensureAuthenticated, adminController.renderAdminManageBlossomsPage);

route.get('/manage/categories', adminAuth.ensureAuthenticated, adminController.renderAdminManageCategoriesPage);

route.get('/logout', adminController.logout);

route.post('/register', adminController.registerAdmin);

route.post('/login', adminAuth.authentication);

route.post('/manage/categories/add', adminController.addNewCategory);

route.post('/manage/categories/editanddelete/:id', adminController.editAndDeleteCategory);

route.post('/manage/blossoms/add', upload.single('image'), adminController.addNewFlower);

route.post('/manage/blossoms/editanddelete/:id', adminController.editAndDeleteFlower);

module.exports = route;