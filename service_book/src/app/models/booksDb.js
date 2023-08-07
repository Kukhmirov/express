const { Schema, model } = require('mongoose');

const bookScheme = new Schema({
    title: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        default: "",
    },
    authors: {
        type: String,
        default: "",
    },
    favorite: {
        type: String,
        default: "",
    },
    fileCover: {
        type: String,
        default: "",
    },
    fileName: {
        type: String,
        default: "",
    },
    originalname: {
        type: String,
        default: "",
    },
    fileBook: {
        type: Buffer,
        required: true,
    },
});

module.exports = model("BooksDb", bookScheme);