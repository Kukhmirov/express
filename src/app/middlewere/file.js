const multer = require('multer');

const storage = multer.diskStorage({
    destination(req, res, callback){
        callback(null, 'src/app/assets/books');
    },
    filename(req, file, callback){
        callback(null, `${Date.now()}-${file.originalname}`);
    },
});

const fileFilter = (req, file, callback) => {
    if(file.mimetype === 'text/plain') {
        callback(null, true);
    }
    else{
        callback(null, false);
    }
};

module.exports = multer({storage, fileFilter});