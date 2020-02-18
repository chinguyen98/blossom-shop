const express = require('express');
const app = express();

/* Import modules */
const expressLayouts = require('express-ejs-layouts');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');

/* Config */
dotenv.config('../.env');
const mongoDBUri = require('./config/keys').mongoDBUri;
const PORT = require('./config/keys').PORT;

/* Setting */
app.use(express.static('./public'));

mongoose.connect(mongoDBUri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connect to mongoDB successfully!');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(session({ cookie: { maxAge: null }, secret: 'secret', name: 'session', resave: false, saveUninitialized: false }));

app.use(flash());
app.use((req, res, next) => {
    res.locals.msg_success = req.flash('msg-success');
    res.locals.msg_error = req.flash('msg-error');
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    res.locals.msg_valid_error = req.flash('msg-valid-err');
    next();
});

app.use(passport.initialize());
app.use(passport.session());

app.all('*', (req, res, next) => {
    res.locals.admin = req.user || null;
    res.locals.user = req.user || null;
    next();
});

/* Set view engine (EJS) */
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('views', './views');
app.set('layout', './layouts/app.layout.ejs');

/* Import Route */
const indexRoute = require('./routes/home.route.js');
const adminRoute = require('./routes/admin.route.js');
const userRoute = require('./routes/user.route.js');

/* Routers */
app.use('/', indexRoute);
app.use('/users', userRoute);
app.use('/admins', adminRoute);

app.listen(PORT, () => console.log(`The server is running at PORT ${PORT}!...`));