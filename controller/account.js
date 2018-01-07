var router = require("express")(),
    Account = require("../model/account.js"),
    Profile = require("../model/profile.js"),
    csrf = require("csurf"),
    util = require("../lib/s_scripts.js");

var csrfProtection = csrf({cookie: true}); 


//
// REGISTER
router.get("/Register", csrfProtection,  function(req, res) {
    res.render("account/register", {
        title: "Register Account",
        csrfToken: req.csrfToken() 
    });
});

router.post("/Register", csrfProtection, function(req, res) {
    var post = req.body;

    var d = new Date();

    var code = util.generateRandomNum();

    let p = new Profile({
        firstName: post.tbFirst.trim(),
        midName: post.tbMiddle.trim(),
        lastName: post.tbLast.trim(),
        genderId: 0,
        dob: "2018/01/10"
    });

    
    let a = new Account({
        osis: post.tbOsis.trim(),
        email: post.tbEmail.trim() + "@aoiths.org",
        password: post.tbPass + code,
        dateCreated: d.getDate(),
        profileID: 0,
        accountTypeId: 1,
        lastLogin: "",
        lastUpdate: ""
    }, p.model);

    a.save();
    
    res.render("/Confirmation", {
       title: "Confirm Account",
    });
});

router.get("/Confirmation", function(req, res){
    res.send("Check Email for Code");
});

//
// LOGIN
router.get("/Login", csrfProtection, function(req, res) {

    res.render("account/login", {
        title: "Login",
        csrfToken: req.csrfToken()
    });
});


router.post("/Login", csrfProtection, function(req, res) {

    console.log(req.body);

    res.render("account/login", {
        title: "Login",
        csrfToken: req.csrfToken()
    });
});





module.exports = router;
