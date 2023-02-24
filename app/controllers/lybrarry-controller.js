const lybrary = require('../model/library-book');
const {v4: uuid} = require('uuid');

class Books {
    constructor(title, description, authors, favorite, fileCover, fileName, id = uuid()) {
        this.id = id,
        this.title = title,
        this.description = description,
        this.authors = authors,
        this.favorite = favorite,
        this.fileCover = fileCover,
        this.fileName = fileName
    }
};

exports.create = (req, res) => {
    const {book} = lybrary;
        const {title, description, authors, favorite, fileCover, fileName} = req.body;
        
        const newBooks = new Books(title, description, authors, favorite, fileCover, fileName);
        book.push(newBooks);

        res.json(newBooks);
        res.status(201);
};

exports.findAll = (req, res) => {
    const {book} = lybrary;
    res.json(book);
};

exports.findOne = (req, res) => {
    const {book} = lybrary;
    const {id} = req.params;
    const index = book.findIndex(elem => elem.id === id);

    if(index !== -1) {
        res.json(book[index])
    } else {
        res.status(404);
        res.json('ЗАпись не найдена');
    }
};

exports.update = (req, res) => {
    const {book} = lybrary;
    const {title, description, authors, favorite, fileCover, fileName} = req.body;
    const {id} = req.params;

    const index = book.findIndex(elem => elem.id === id);
    if(index !== -1) {
        book[index] = {
            ...book[index],
            title,
            description,
            authors,
            favorite,
            fileCover,
            fileName,
        };
        res.json(book[index]);
    } else {
        res.status(404);
        res.json('Запись не найдена');
    }
};

exports.delete = (req, res) => {
    const {book} = lybrary;
    const {id} = req.params;
    const index = book.findIndex(elem => elem.id === id);

    if(index !== -1) {
        book.splice(index, 1);
        res.status(201);
        res.json(book);
    } else {
        res.status(404);
        res.json('Запись не найдена');
    }
};