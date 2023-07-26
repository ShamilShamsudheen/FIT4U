const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Purchase = new Schema({
    purchase_id: {
        type: String,
        required: true
    },
    purchase_amount: {
        type: Number,
        required: true
    },
    purchase_date: {
        type: Date,
        required: true
    },
    purchase_expire: {
        type: Date,
        required: true
    },
    trainer_id: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Purchase', Purchase);
