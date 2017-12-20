var multer = require('multer'),
    path = require('path');

var storage = multer.diskStorage({
    destination: 'public/uploads/',
    filename: function(req, res, callback){
        callback(null, res.fieldname + '-' + Date.now() + path.extname(res.originalname));
    }
});

module.exports = multer({storage: storage});
