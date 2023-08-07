module.exports = app => {
    const router = require('express').Router();
    const controller = require('../controllers/lybrarry-controller');
    const bookFile = require('../middlewere/file');

    router.get('/', controller.firstPage);

    router.get('/create', controller.create);

    router.post('/create',
        bookFile.single('fileBook'),
        controller.createNewBook
    );

    router.get('/book/:id', controller.infoBook);

    router.get('/update/:id', controller.update);

    router.post('/update/:id',
        bookFile.single('fileBook'),
        controller.updateBook
    );

    router.get('/upload/:id', controller.uploadBook);
    
    router.post('/delete/:id', controller.deleteBook);

    app.use('/', router);
};