var multer = require('multer'),
    path = require('path');

var callback = function(err){
    if(err)
        console.log(err);
    else
        console.log("upload successful.");
}

var destination = 'public/uploads/';
var utilities = {
    upload: function(input, fileName, req, res){
        var storage = multer.diskStorage({
            destination: destination,
            filename: function(req, res, callback){
                callback(null, fileName + '-' + Date.now() + path.extname(res.originalname));
            }
        });
        return multer({storage: storage}).single(input)(req, res, callback);
    },
    setDestination: function(dest){
        destination = `public/uploads/${dest}`;
    }
}

module.exports = utilities;
