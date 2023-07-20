const express = require('express');
const app = express();
const logger = require('./app/middlewere/logger');
const err404 = require('./app/middlewere/err-404');

app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.set('view engine', 'ejs');
app.use(logger);

require("./app/routers/router")(app);
app.use(err404);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});