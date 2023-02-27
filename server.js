const express = require('express');
const app = express();
const cors = require('cors')
const logger = require('./app/middlewere/logger');
const err404 = require('./app/middlewere/err-404');

var corsOptions = {
    origin: 'http://localhost:8080'
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(logger);

app.get('/', (req, res) => {
    res.json({message: 'Welcom to the Lybrary'})
});

require("./app/routers/router")(app);
app.use(err404);

const PORT = process.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});