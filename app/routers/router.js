module.exports = app => {
    const router = require('express').Router();
    const controller = require('../controllers/lybrarry-controller');

    router.post('/user/login', (req, res) => {});

    router.get('/books', controller.findAll);

    router.get('/books/:id', controller.findOne);

    router.post('/books/', controller.create);

    router.put('/books/:id', controller.update);

    router.delete('/books/:id', controller.delete);

    
    app.use('/api', router);
};