var express = require("express"),
    router = express(),
    uploadUtil = require('../util/upload.js');

router.get("/", function(req, res) {
    if(!req.user){
        res.redirect('account/login');
    }


    res.render("main/index", {
        title: "Index"
    });
});

router.get("/contact", function(req, res) {
    res.render("main/contact", {
        title: "Contact Us"
    });
});

module.exports = router;
