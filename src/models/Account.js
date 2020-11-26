const mongoose = require('mongoose');
const { Schema } = mongoose;

const accountSchema = new Schema({
    cpf: {
        type: String
    },
    cnpj: {
        type: String
    }
});

module.exports = mongoose.model('accounts', accountSchema);