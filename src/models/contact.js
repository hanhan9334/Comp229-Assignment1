const mongoose = require('mongoose');
require('../db/mongoose');
const contactSchema = new mongoose.Schema({
    name: {
        type: String
    },
    number: {
        type: Number
    },
    email: {
        type: String
    }
})

const Contact = mongoose.model('contast', contactSchema);



module.exports = Contact;