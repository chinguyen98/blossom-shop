const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    type: { type: Number, default: 0 },
    create_at: { type: Date, required: true, default: Date.now },
    update_at: { type: Date, required: true, default: Date.now }
});

adminSchema.methods.encryptPassword = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

adminSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

const Admin = mongoose.model('admins', adminSchema);

module.exports = Admin;