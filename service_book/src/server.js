const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

const logger = require('./app/middlewere/logger');
const err404 = require('./app/middlewere/err-404');


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

const PORT = process.env.PORT || 3000;
const UrlDb = process.env.MONGODB_URL;
startDb(UrlDb)
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});