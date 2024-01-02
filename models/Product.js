const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new mongoose.Schema({
    company: {
        type: Schema.Types.ObjectId,
        ref: 'Company',
    },
    name: {
        type: String,
        required: true
    },
    amount: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    unit: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
      },
})
module.exports = Product = mongoose.model('Product', productSchema);