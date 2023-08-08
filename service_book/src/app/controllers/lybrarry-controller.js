const {v4: uuid} = require('uuid');
const { incrPost, incrGet } = require("../routers/counter");
const BooksDb = require("../models/booksDb");


exports.firstPage = async(req, res) => {
    const books = await BooksDb.find().select("-__v");
    res.render('book/index', {
        title: 'Книжный',
        books: books,
    })
};

exports.create = (req, res) => {
    res.render('book/create', {
        title: 'Добавить новую книгу',
        book: {},
    })
};

exports.createNewBook = async(req, res) => {
    const { title, description, authors, favorite, fileCover } = req.body;
    const originalname = req?.file?.originalname || null;
    const fileBook = req?.file?.path || null;
    const fileName = req?.file?.filename || null;
    
    const newBookDb = new BooksDb({ title, description, authors, favorite, fileCover, fileName, originalname, fileBook });
    try {
        await newBookDb.save();
        res.redirect('/');
    } catch(err) {
        console.log(err);
        res.redirect('/404');
    }
};

exports.infoBook = async(req, res) => {
    const { id } = req.params;
    const book = await BooksDb.findById(id).select("-__v");
    
    if(!book) {
        res.redirect('/404');
    } else {
        const countUloadBook = await incrGet(id) || 0;
        
        res.render('book/view', {
            title: 'book | view',
            book: book,
            countUloadBook: countUloadBook,
        })
    }
};

exports.update = async(req, res) => {
    const { id } = req.params;
    const book = await BooksDb.findById(id).select("-__v");

    if(!book) {
        res.redirect('/404');
    } else {
        res.render('book/update', {
            title: 'Изменить',
            book: book
        })
    }
};

exports.updateBook = async(req, res) => {
    const {title, description, authors, favorite, fileCover, fileName} = req.body;
    const {id} = req.params;

    try {
        await BooksDb.findByIdAndUpdate(id, {
            title,
            description,
            authors,
            favorite,
            fileCover,
            fileName,
        });
        res.redirect('/');
    } catch(env) {
        res.redirect('/404');
    };
};

exports.uploadBook = async(req, res) => {
    const {id} = req.params;
    const book = await BooksDb.findById(id).select("-v");
  
    if (!book) {
        res.redirect('/404');
    } else {
        const fileName = book.originalname;
        const fileType = book.fileBook.sub_type;
  
        if (fileType) {
            res.setHeader('Content-Type', fileType);
        }
  
        res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
        res.send(book.fileBook.buffer);
        incrPost(id);
    }
};

exports.deleteBook = async(req, res) => {
    const {id} = req.params;

    try {
        await BooksDb.deleteOne({
            _id: id,
        });
        res.redirect('/');
    } catch(env) {
        res.redirect('/404');
    }
};