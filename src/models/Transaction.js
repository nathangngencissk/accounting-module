const mongoose = require('mongoose');
const { Schema } = mongoose;

const transactionSchema = new Schema({
    account: {
        type: Schema.Types.ObjectId,
        ref: "Account"
    },
    code: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    value: {
        type: Number,
        require: true
    },
    operation: {
        type: String,
        enum: ['CREDITO',
            'DEBITO'],
        require: true
    },
    integration: {
        type: Schema.Types.ObjectId,
        ref: "Integration"
    },
    name: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('transactions', transactionSchema);