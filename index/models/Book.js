const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    genre: {
        type: String,
    },
    pages: {
        type: String,
    },
    published: {
        type: String,
    },
    awards: {
        type: String,
    },
});

module.exports = mongoose.model('Book', BookSchema)