const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.json({message: 'Welcom to the Lybrary'})
});

require("./app/routers/router")(app);

const PORT = process.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});