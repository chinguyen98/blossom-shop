const mongoose = require('mongoose');

const flowerSchema = mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    categoryId: { type: String, required: true },
    create_at: { type: Date, required: true, default: Date.now },
    update_at: { type: Date, required: true, default: Date.now }
});

const Flower = mongoose.model('flowers', flowerSchema);

module.exports = Flower;