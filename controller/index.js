var express = require("express"),
    router = express(),
    upload = require('../config/upload.js');

router.get("/", function(req, res) {
    res.render("main/index", {
        title: "Index"
    });
});


router.get("/contact", function(req, res) {
    res.render("main/contact", {
        title: "Contact Us"
    });
});

router.post('/upload', upload.single('myFile'), function(req, res, next){
    // upload.single('myFile');
    console.log(req.body);
    console.log(req.file);
    res.status(204).end();
});

module.exports = router;
