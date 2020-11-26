const mongoose = require('mongoose');
const { Schema } = mongoose;

const movementSchema = new Schema({
    month: {
        type: Number,
        require: true
    },
    year: {
        type: Number,
        require: true
    }
});

module.exports = mongoose.model('movements', movementSchema);