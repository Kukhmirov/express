const express = require('express');
const app = express();
const path = require('path');
const redis = require('redis');

const logger = require('./app/middlewere/logger');
const err404 = require('./app/middlewere/err-404');

const REDIS_URL = process.env.REDIS_URL || 'localhost';

const client = redis.createClient({ url: REDIS_URL });

(async () => {
    await client.connect();
})();

app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.set('view engine', 'ejs');
app.use(logger);
app.set('views', path.join(__dirname, 'views'));
require("./app/routers/router")(app);
app.use(err404);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});