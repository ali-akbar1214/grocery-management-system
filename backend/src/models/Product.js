const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    barcode: {
        type: String,
        required: true,
        unique: true,
    },
    quantity: {
        type: Number,
        required: true,
        default: 0,
    },
    lowStockThreshold: {
        type: Number,
        required: true,
        default: 10,
    },
    overstockThreshold: {
        type: Number,
        required: true,
        default: 100,
    },
}, {
    timestamps: true,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
