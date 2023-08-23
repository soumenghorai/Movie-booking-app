const mongoose = require('mongoose');

const MovieModel = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    casts: {
        type: [String],
        required: true
    },
    trailerUrl: {
        type: String,
        required: true
    },
    posterUrl: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    releaseDate: {
        type: Date,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    releaseStatus: {
        type: String,
        required: true,
        default: "RELEASED"
    },
    updatedAt: {
        type: Date,
        default: () => {
            return Date.now();
        }
    }
})

module.exports = mongoose.model("Movie", MovieModel)