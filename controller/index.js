var express = require("express"),
    router = express(),
    uploadUtil = require('../util/upload.js');


router.get("/", function(req, res) {
    if(!req.user){
        res.redirect('account/login');
    } else {
        res.redirect('student/');
    }
<<<<<<< HEAD

=======
>>>>>>> 2455026dd04f62608fe695c24237697cfa661fab
});


router.get("/contact", function(req, res) {
    res.render("main/contact", {
        title: "Contact Us"
    });
});

module.exports = router;
