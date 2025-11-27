const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
    sale: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Sale',
    },
    customerInfo: {
        type: String,
    },
    paymentMethod: {
        type: String,
        enum: ['Cash', 'Card', 'Digital Wallet', 'Other'],
        default: 'Cash',
    },
    billData: {
        type: String, // This can be a stringified JSON or HTML
        required: true,
    },
}, {
    timestamps: true,
});

const Bill = mongoose.model('Bill', billSchema);

module.exports = Bill;
