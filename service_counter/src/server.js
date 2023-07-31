const express = require("express");
const app = express();

const redis = require("redis");
const REDIS_URL = process.env.REDIS_URL || 'redis://storage';

const client = redis.createClient({ url: REDIS_URL });

(async () => {
    await client.connect();
})();

app.get("/counter/:bookID", async( req, res ) => {
    const { bookID } = req.params;
    console.log(bookID);

    try {
      const cnt = await client.get( bookID );
      res.json({cnt});
    } catch(evt) {
      res.json({errcode: 500, ermsg: evt});
    }
});
    
    
app.post("/counter/:bookID/incr", async( req, res ) => {
    const { bookID } = req.params;

    try {
      const cnt = await client.incr(bookID);
      res.json({ cnt });
    } catch(evt) {
      res.json({ errcode: 500, ermsg: "redis err!" });
    }
})


const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Сервер запущен на ${ PORT } порту`);
});