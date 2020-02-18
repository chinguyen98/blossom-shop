const route = require('express').Router();
const multer = require('multer');
const upload = multer({ dest: './public/images/flowers/' });

const adminController = require('../controllers/admin.controller');
const auth = require('../middlewares/auth.middleware');

route.get('/', auth.ensureAdminAuthenticated, adminController.renderAdminHomePage);

route.get('/login', auth.redirectIfAdminAuthenticated, adminController.renderAdminLoginPage);

route.get('/register', auth.ensureAdminAuthenticated, adminController.renderAdminRegisterPage);

route.get('/manage/blossoms', auth.ensureAdminAuthenticated, adminController.renderAdminManageBlossomsPage);

route.get('/manage/categories', auth.ensureAdminAuthenticated, adminController.renderAdminManageCategoriesPage);

route.get('/logout', adminController.logout);

route.post('/register', adminController.registerAdmin);

route.post('/login', auth.adminAuthentication);

route.post('/manage/categories/add', adminController.addNewCategory);

route.post('/manage/categories/editanddelete/:id', adminController.editAndDeleteCategory);

route.post('/manage/blossoms/add', upload.single('image'), adminController.addNewFlower);

route.post('/manage/blossoms/editanddelete/:id', adminController.editAndDeleteFlower);

module.exports = route;