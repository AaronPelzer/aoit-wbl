var express = require("express"),
    router = express(),
    uploadUtil = require('../util/upload.js');

router.get("/", function(req, res) {
    if(!req.user){
        res.redirect('account/login');
    } else {
        res.redirect('student/profile');
    }
});

router.get("/contact", function(req, res) {
    res.render("main/contact", {
        title: "Contact Us"
    });
});

module.exports = router;
