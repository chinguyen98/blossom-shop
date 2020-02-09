const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');

dotenv.config('../.env');
const sqlStringConnect = process.env.SQLSTRINGCONNECT;

mongoose.connect(sqlStringConnect, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connect database successfully!');
});

const adminSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    type: { type: Number, default: 0 }
});

adminSchema.methods.encryptPassword = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

adminSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

const User = mongoose.model('admins', adminSchema);

module.exports = User;