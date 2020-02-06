const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config('../.env');
const sqlStringConnect = process.env.SQLSTRINGCONNECT;

mongoose.connect(sqlStringConnect, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connect database successfully!');
});

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

const User = mongoose.model('user', userSchema);

module.exports = User;