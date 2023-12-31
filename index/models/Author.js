const mongoose = require('mongoose');

const AuthorSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    age: {
        type: String,
    },
    nationality: {
        type: String,
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
    }
});

module.exports = mongoose.model('Author', AuthorSchema)