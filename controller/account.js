var router = require("express")(),
    Account = require("../model/account.js"),
    Profile = require("../model/profile.js"),
    csrf = require("csurf"),
    bcrypt = require("bcryptjs"),
    util = require("../lib/s_scripts.js"),
    passport = require("passport"),
    LocalStrategy = require("passport-local").Strategy;
 

var csrfProtection = csrf({cookie: true}); 


//
// REGISTER
router.get("/Register", csrfProtection,  function(req, res) {
    res.render("account/register", {
        title: "Register Account",
        csrfToken: req.csrfToken(),
        errors: []
    });
});

router.post("/Register", csrfProtection, function(req, res) {


    console.log("HIT");
    console.log(req.body);

    var post = req.body;

    // CREATE OBJECTS 1ST THEN VALIDATE
    // SET PASS TO NULL IN ACCOUNT{} THEN PROCESS AFTER VALIDATION
    req.checkBody("tbFirst", "First name is required").notEmpty();
    req.checkBody("tbLast", "Last name is required").notEmpty();
    req.checkBody("tbEmail", "Email name is required").notEmpty();
    req.checkBody("tbOsis", "OSIS is at least 9 numbers").isLength({min: 9});

    console.log(post.tbOsis === post.tbCOsis);

    req.checkBody("tbCOsis", "OSIS does not match").equals(post.tbOsis);

    let err = req.validationErrors();

    if(err){
        console.log(err);
        
        res.render("account/register", {
            title: "Register Account",
            csrfToken: req.csrfToken(),
            errors: err
        });
    } else {
        console.log("\n\nPASSED\n\n");

        var d = new Date();

        let p = new Profile({
            firstName: post.tbFirst.trim(),
            midName: post.tbMiddle.trim(),
            lastName: post.tbLast.trim(),
            genderId: 0,
            dob: "2018/01/10"
        });

        var pass = post.tbOsis.trim() + "" + util.generateRandomNum();

        console.log(pass);
        
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(pass, salt, function(err, hash) {
                

                let a = new Account({
                    osis: post.tbOsis.trim(),
                    email: post.tbEmail.trim() + "@aoiths.org",
                    password: hash,
                    dateCreated: d.getDate(),
                    profileID: 0,
                    accountTypeId: 1,
                    lastLogin: "",
                    lastUpdate: ""
                }, p.model);

                console.log(a.model);
                
                // COMMENTED OUT FOR PRIOR TESTING
                a.save(function(status){
                    if(status){
                        res.render("/Confirmation", {
                            title: "Confirm Account",
                        });
                    }
                });


                req.flash("success_msg", "Please check your email to validate your account");
                res.redirect("Confirmation");
            });
        });
    
    }
    


});

router.get("/Confirmation", function(req, res){

    res.render("account/confirm", {
        title: "Confirm Account"
    });

});


//
// LOGIN
router.get("/Login", csrfProtection, function(req, res) {

    res.render("account/login", {
        title: "Login",
        csrfToken: req.csrfToken() 
    });

});


passport.use(new LocalStrategy(function(email, password, done) {

        let acc = new Account();

        acc.getAccountByEmail(email, function(err, user) {
            console.log("EMAIL");
            if (err) { 
                return done(err); 
            }
            if (!user) {
                return done(null, false, { message: 'Email Is Not Registered!' });
            }

            acc.comparePassword(password, user.password, function(err, isMatch){
                console.log("Password");
                if(err) throw err;

                if(isMatch){
                    console.log(user);
                    return done(null, user);
                } else {
                    return done(null, false, { message: 'Invalid Password!' });
                }
            });

        });
    }
));

passport.serializeUser(function(user, done) {
    done(null, user.ID);
});
  
passport.deserializeUser(function(id, done) {
    let acc = new Account();
    
    acc.getAccountById(id, function(err, user) {
        done(err, user);
    }); 
});

// csrfProtection
router.post("/Login", csrfProtection, passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/Account/Login",
    failureFlash: true
}), function(req, res){

    console.log(req.user);
    res.redirect("/");
});


router.get("/Logout", function(req, res){
    req.logOut();

    req.flash("success_msg", "You are logged out");
    res.redirect("/Account/Login");
});

module.exports = router;
