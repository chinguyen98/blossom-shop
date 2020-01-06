const express = require('express');
const app = express();

/* Import modules */
const path = require('path');

/* Config */
const PORT = process.env.PORT || 3000;
app.use('/static', express.static(path.join(__dirname, 'public')));

/* Set view engine */
app.set('views', './views');
app.set('view engine', 'ejs');

/* Routes */
const indexRoute = require('./routes/home.route.js');

app.get('/', indexRoute);

app.listen(PORT, () => console.log(`The server is running at PORT ${PORT}!...`));