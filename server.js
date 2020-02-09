const express = require('express');
const app = express();

/* Import modules */
const expressLayouts = require('express-ejs-layouts');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');

/* Config */
dotenv.config('./.env');
const PORT = process.env.PORT || 3000;
const sqlStringConnect = process.env.SQLSTRINGCONNECT;
app.use(express.static('./public'));

/* Setting */
mongoose.connect(sqlStringConnect, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connect to mongoDB successfully!');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({ cookie: { maxAge: null }, secret: 'secret', name: 'session', resave: false, saveUninitialized: false }));

app.use(flash());
app.use((req, res, next) => {
    res.locals.messages = require('express-messages')(req, res)();
    next();
});

app.use(passport.initialize());
app.use(passport.session());

/* Set view engine (EJS) */
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('views', './views');
app.set('layout', './layouts/app.layout.ejs');

/* Import Route */
const indexRoute = require('./routes/home.route.js');
const adminRoute = require('./routes/admin.route.js');

/* Routers */
app.use('/', indexRoute);
app.use('/admins', adminRoute);

app.listen(PORT, () => console.log(`The server is running at PORT ${PORT}!...`));