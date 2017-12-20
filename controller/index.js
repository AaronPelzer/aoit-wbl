var express = require("express"),
    router = express(),
    uploadUtil = require('../config/upload.js');

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

// router.post('/upload', function(req, res, next){
//     // uploadUtil.setDestination('201421409');
//     // uploadUtil.upload('John\'s_resume', 'myFile', req, res);
//     res.status(204).end();
// });

module.exports = router;
