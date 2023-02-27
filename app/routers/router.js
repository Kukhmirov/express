module.exports = app => {
    const router = require('express').Router();
    const controller = require('../controllers/lybrarry-controller');
    const bookFile = require('../middlewere/file');
    const multer = require('multer');
    const upload = multer();

    router.post('/user/login', (req, res) => {
        res.json('Сервис времено не доступен');
    });

    router.post('/upload-book/',
        bookFile.single('book-txt'),
        controller.createBook
    );

    router.get('/books', controller.findAll);

    router.get('/books/:id', controller.findOne);

    router.get('/books/:id/download', controller.download)

    router.put('/books/:id', controller.update);

    router.delete('/books/:id', controller.delete);

    
    app.use('/api', router);
};