const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    userId: { type: String, required: true },
    flowerId: { type: String, required: true },
    quantity: { type: Number, required: true },
    create_at: { type: Date, required: true, default: Date.now },
    update_at: { type: Date, required: true, default: Date.now }
});

const Cart = mongoose.model('carts', cartSchema);

module.exports = Cart;