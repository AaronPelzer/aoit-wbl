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
    var crypto = require('crypto');

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

        let p = new Profile({
            firstName: post.tbFirst.trim(),
            midName: post.tbMiddle.trim(),
            lastName: post.tbLast.trim(),
            genderID: 0,
            genderOther: "",
            dob: "2018/01/10"
        });
                
        p.save((err, context) => {

            if(err){
                console.log(err);
                return console.error(err.msg);
            }
            
            let date = new Date(),
                dateStr = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

            let a = new Account({
                osis: post.tbOsis.trim(),
                email: post.tbEmail.trim() + "@aoiths.org",
                dateCreated: dateStr,
                lastLogin: dateStr,
                lastUpdate: dateStr,
                profileID: context.insertId,
                accountTypeId: 1
            });

            // COMMENTED OUT FOR PRIOR TESTING
            a.save((err, context, rand) => {
                if(err){
                    console.error(err);
                } else {
                    var data = a.model.osis +  a.model.email;

                    let obj = {
                        accountID: context.ID,
                        link: crypto.createHash('md5').update(data).digest("hex")
                    };

                    a.setAccountHold(obj, function(err, context){

                        if(err)
                            console.error(err);

                        req.flash("success_msg", "Please check your email to validate your account");
                
                        let mail = require('../lib/nodeMailer');
                            mail.sendConfirmationLink(a.model.email, p.model.lastName, rand, obj.link);

                        res.render("account/confirm", {
                            title: "Confirm Account",
                        });

                    });
                    
                }
            });

        });
    }
});

router.get("/Confirmation", function(req, res){

    res.render("account/confirm", {
        title: "Confirm Account"
    });

});


// FINISH VERIFICATION -> CONTROLLER.ACCOUNT VERIFYACCOUNT
router.get("/Verify/:token", function(req, res){

    var account = new Account();

    var t = req.params;

    account.verifyAccount( null, "link=?", [t.token], function(err){
        if(err) console.error(err);

        console.log("Activated Successfully");
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
            };

            acc.comparePassword(password, user.password, function(err, isMatch){
                console.log("Password");
                if(err) throw err;
                isMatch = true;
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
    console.log(req.body);
    console.log(req.user);
    res.redirect("/Student");
});


router.get("/Logout", function(req, res){
    req.logOut();

    req.flash("success_msg", "You are logged out");
    res.redirect("/Account/Login");
});

module.exports = router;
