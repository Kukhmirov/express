module.exports = app => {
    const router = require('express').Router();
    const controller = require('../controllers/lybrarry-controller');
    const bookFile = require('../middlewere/file');

    router.get('/', controller.firstPage);

    router.get('/api/create', controller.create);

    router.post('/api/create',
        bookFile.single('fileBook'),
        controller.createNewBook
    );

    router.get('/api/book/:id', controller.infoBook);

    router.get('/api/update/:id', controller.update);

    router.post('/api/update/:id',
        bookFile.single('fileBook'),
        controller.updateBook
    );

    router.get('/api/upload/:id', controller.uploadBook);
    
    router.post('/api/delete/:id', controller.deleteBook);

    app.use('/', router);
};