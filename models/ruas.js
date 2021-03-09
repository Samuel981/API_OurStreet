const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    rua: { type: String, required: true},
    cep: { type: Number, required: true, unique: true},
    bairro: { type: String, required: true},
    cidade: { type: String, required: true },
    calçamento: { type: String, required: true},
    saneamento: {type: String, required: true}
});

module.exports = mongoose.model('ruas', UserSchema);