const express = require('express');
const app = express();

/* Import modules */
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const dotenv = require('dotenv');

/* Config */
dotenv.config('./.env');
const PORT = process.env.PORT || 3000;
app.use(express.static('./public'));

/* Set view engine */
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('views', './views');
//app.set('view options', { layout: '/layout/app.ejs' });

/* Import Route */
const indexRoute = require('./routes/home.route.js');
const adminRoute = require('./routes/admin.route.js');

/* Routers */
app.use('/', indexRoute);
app.use('/admins', adminRoute);

app.listen(PORT, () => console.log(`The server is running at PORT ${PORT}!...`));