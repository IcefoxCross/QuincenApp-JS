const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false)

const quincenaSchema = new mongoose.Schema({
    init_day: {type: Date, default:Date.now, required: true},
    income: {type: [Number]},
    expenses: {type: [Number]}
});

module.exports = mongoose.model('Quincena', quincenaSchema);