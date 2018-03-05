var express = require("express"),
    router = express(),
    uploadUtil = require('../util/upload.js'),
    Student = require('../model/profile');

/*
router.get("/", function(req, res) {

    console.log(req.session);

    /*
        if(!req.user){
            res.redirect('account/login');
        }
    * /

    console.log(req.user);

    res.render("student/index", {
        title: "Dashboard",

    });
});
*/
function isAuthenticated(req, res, next) {

    if (req.isAuthenticated()) {
        return next();
    } else {
        req.flash("error_msg", "You are not logged in");
        res.redirect("/Account/Login");
    }
}

router.get("/", isAuthenticated, (req, res) => {
    let student = new Student();
    student.getOne(req.user.ID, (err, data) => {
        res.render("student/index", {
            title: "Index",
            student: data
        })
    })
});

router.get("/contact", function(req, res) {
    res.render("main/contact", {
        title: "Contact Us"
    });
});

module.exports = router;