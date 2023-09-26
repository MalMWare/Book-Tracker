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
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    }
});

module.exports = mongoose.model('Book', BookSchema)