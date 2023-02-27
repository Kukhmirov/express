const express = require('express');
const lybrary = require('../model/library-book');
const {v4: uuid} = require('uuid');

class Books {
    constructor(title, description, authors, favorite, fileCover, fileName, fileBook, id = uuid()) {
        this.id = id,
        this.title = title,
        this.description = description,
        this.authors = authors,
        this.favorite = favorite,
        this.fileCover = fileCover,
        this.fileName = fileName,
        this.fileBook = fileBook
    }
};

exports.createBook = (req, res) => {
    if(req.file) {
        const {path} = req.file;
        const {book} = lybrary;
        const {title, description, authors, favorite, fileCover, fileName} = JSON.parse(req.body.data);
        const newBooks = new Books(title, description, authors, favorite, fileCover, fileName, path);
        book.push(newBooks);
        res.json(newBooks);
        res.status(201);
    } else {
        res.send('Ошибка при загрузке файла');
    }
};

exports.download = (req, res) => {
    const {book} = lybrary;
    const {id} = req.params;
    const index = book.findIndex(elem => elem.id === id);

    if(index !== -1) {
        const file = book[index].fileBook;
        res.download(file);
    } else {
        res.status(404);
        res.json('Запись не найдена');
    }

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