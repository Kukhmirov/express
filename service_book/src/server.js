const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const http = require('http');
const socketIO = require('socket.io');


const logger = require('./app/middlewere/logger');
const err404 = require('./app/middlewere/err-404');

const app = express();
const server = http.Server(app);
const io = socketIO(server);

app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.set('view engine', 'ejs');

app.use(logger);

app.set('views', path.join(__dirname, 'views'));

require("./app/routers/router")(app);

async function startDb(UrlDb){
    try {
        await mongoose.connect(UrlDb, {
            dbName: 'books',
        });
    } catch(env) {
        console.log(env);
    }
};

app.use(err404);

require("./app/socket")(io);

const PORT = process.env.PORT || 3000;
const UrlDb = process.env.MONGODB_URL;

startDb(UrlDb);

//вместо app.listen запускаем server и передаем туда app
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});