const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    legalNumber: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    website: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
      },
})
module.exports = Company = mongoose.model('Company', companySchema);