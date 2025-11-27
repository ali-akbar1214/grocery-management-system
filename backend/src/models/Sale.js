const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
    saleId: {
        type: Number,
        unique: true,
        required: true,
    },
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    items: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Product',
        },
        quantity: {
            type: Number,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
    }],
    total: {
        type: Number,
        required: true,
    },
    isReturn: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});

const Sale = mongoose.model('Sale', saleSchema);

module.exports = Sale;
