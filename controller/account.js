var router = require("express")(),
    Account = require("../model/account.js"),
    Profile = require("../model/profile.js"),
    csrf = require("csurf");

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

    console.log("HIT");
    console.log(req.body);

    var post = req.body;

    var d = new Date();

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
        password: post.tbPass,
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

router.post("/login", csrfProtection, function(req, res){
    var post = req.body;

    let a = new Account();
    
    a.getOne([post.email, post.password], function(data){
        console.log(data);
    });
});





module.exports = router;
