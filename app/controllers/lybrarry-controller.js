const express = require('express');
const {v4: uuid} = require('uuid');

class Books {
    constructor(title, description, authors, favorite, fileCover, fileName, originalname, fileBook, id = uuid()) {
        this.id = id,
        this.title = title,
        this.description = description,
        this.authors = authors,
        this.favorite = favorite,
        this.fileCover = fileCover,
        this.fileName = fileName,
        this.originalname = originalname,
        this.fileBook = fileBook
    };
};

const lybraryStore = {
    book: [],
};

exports.firstPage = (req, res) => {
    const { book } = lybraryStore;
    res.render('book/index', {
        title: 'Книжный',
        books: book,
    })
};

exports.create = (req, res) => {
    res.render('book/create', {
        title: 'Добавить новую книгу',
        book: {},
    })
};

exports.createNewBook = (req, res) => {
    const { book } = lybraryStore;
    const { title, description, authors, favorite, fileCover } = req.body;
    const originalname = req?.file?.originalname || null;
    const fileBook = req?.file?.path || null;
    const fileName = req?.file?.filename || null;
    
    const newBook = new Books( title, description, authors, favorite, fileCover, fileName, originalname, fileBook );
    book.push(newBook);
    res.redirect('/');
};

exports.infoBook = (req, res) => {
    const { book } = lybraryStore;
    const { id } = req.params;
    const index = book.findIndex(elem => elem.id === id);

    if(index === -1) {
        res.redirect('/404');
    } else {
        res.render('book/view', {
            title: 'book | view',
            book: book[ index ]
        })
    }
};

exports.update = (req, res) => {
    const { book } = lybraryStore;
    const { id } = req.params;
    const index = book.findIndex(elem => elem.id === id);

    if(index === -1) {
        res.redirect('/404');
    } else {
        res.render('book/update', {
            title: 'Изменить',
            book: book[ index ]
        })
    }
};

exports.updateBook = (req, res) => {
    const {book} = lybraryStore;
    const {title, description, authors, favorite, fileCover, fileName} = req.body;
    const {id} = req.params;

    const index = book.findIndex(elem => elem.id === id);
    if(index === -1) {
        res.redirect('/404');
    }
    book[index] = {
        ...book[index],
        title,
        description,
        authors,
        favorite,
        fileCover,
        fileName,
    };
    res.redirect('/');
};

exports.uploadBook = (req, res) => {
    const {book} = lybraryStore;
    const {id} = req.params;
    const index = book.findIndex(elem => elem.id === id);
    console.log(book[index].fileBook);
    if(index !== -1 && book[index].fileBook) {
        const file = book[index]?.fileBook;
        res.download(file);
    } else {
        res.redirect('/404');
    }
};

exports.deleteBook = (req, res) => {
    const {book} = lybraryStore;
    const {id} = req.params;
    const index = book.findIndex(elem => elem.id === id);

    if(index !== -1) {
        book.splice(index, 1);
        res.redirect('/');
    } else {
        res.redirect('/404');
    }
};