const router = require("express")(),
      Account = require("../model/account.js"),
      Profile = require("../model/profile.js"),
      Ethnicity = require("../model/ethnicity.js"),
      Gender = require("../model/gender"),
      CTEPathway = require("../model/ctepathway"),
      csrf = require("csurf"),
      bcrypt = require("bcryptjs"),
      util = require("../lib/s_scripts.js"),
      passport = require("passport"),
      LocalStrategy = require("passport-local").Strategy,
      crypto = require('crypto'),
      Pro = require('../model/professional'),
      ProType = require('../model/professionalType');


var csrfProtection = csrf({ cookie: true });


//
// REGISTER
router.get("/Register", csrfProtection, function(req, res) {
    let payload = {};
    let r = new Ethnicity();
    r.get((err, race) => {
        payload.ethnicity = race;
        let g = new Gender();
        g.get((err, gender) => {
            payload.gender = gender;
            let p = new CTEPathway();
            p.get((err, pathway) => {
                payload.pathway = pathway;
                res.render("account/register", {
                    title: "Register Account",
                    csrfToken: req.csrfToken(),
                    results: payload,
                    errors: []
                });
            })
        })
    });

});

router.post("/Register", csrfProtection, function(req, res) {
    let post = req.body;

    // CREATE OBJECTS 1ST THEN VALIDATE
    // SET PASS TO NULL IN ACCOUNT{} THEN PROCESS AFTER VALIDATION
    req.checkBody("tbFirst", "First name is required").notEmpty();
    req.checkBody("tbLast", "Last name is required").notEmpty();
    req.checkBody("tbEmail", "Email name is required").notEmpty();
    req.checkBody("tbOsis", "OSIS must be 9 numbers").isLength({ min: 9, max: 9 });

    req.checkBody("tbCOsis", "OSIS does not match").equals(post.tbOsis);

    let err = req.validationErrors();

    // console.log(post);

    if (err) {
        res.render("account/register", {
            title: "Register Account",
            csrfToken: req.csrfToken(),
            errors: err
        });
    } else {
        if(err){
            console.log(err);
            return console.error(err.msg);
        }
        
        let date = new Date(),
            dateStr = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

        let a = new Account({
            email: post.tbEmail.trim() + "@aoiths.org",
            password: post.tbOsis.trim(),
            dateCreated: dateStr,
            lastLogin: dateStr,
            lastUpdate: dateStr,
            accountTypeID: 5
        });

        console.log("Account");
        console.log(a);

        a.save((err, context, rand) => {
            if(err){
                console.error(err);
            } else {
                let p = new Profile({
                    firstName: post.tbFirst.trim(),
                    midName: post.tbMiddle.trim(),
                    lastName: post.tbLast.trim(),
                    osis: post.tbOsis.trim(),
                    ethnicityID: parseInt(post.ddlRace),
                    genderID: parseInt(post.ddlGender),
                    genderOther: "",
                    pathwayID: parseInt(post.ddlPath),
                    dob: post.tbDOB,
                    accountID: context.insertId
                });
                        
                console.log("Profile");
                console.log(p);
                console.log(rand);

                p.save((err, context) => {

                    var data = a.model.osis +  a.model.email;

                    let obj = {
                        link: crypto.createHash('md5').update(data).digest("hex")
                    };

                    a.setAccountHold(obj, function(err, context){

                        if(err)
                            console.error(err);

                        req.flash("success_msg", "Please check your email to validate your account");
                
                        let mail = require('../lib/nodeMailer');
                        // NEED TO FIX SENDING GENERATED CODE
                            // mail.sendConfirmationLink(a.model.email, p.model.lastName, rand, obj.link);
                            mail.sendConfirmationLink(a.model.email, p.model.lastName, "123", obj.link);

                        res.render("account/confirm", {
                            title: "Confirm Account",
                        });

                    });
                });
            }
        });
    }
});



/*
router.post("/Register", csrfProtection, function(req, res) {
    let post = req.body;

    // CREATE OBJECTS 1ST THEN VALIDATE
    // SET PASS TO NULL IN ACCOUNT{} THEN PROCESS AFTER VALIDATION
    req.checkBody("tbFirst", "First name is required").notEmpty();
    req.checkBody("tbLast", "Last name is required").notEmpty();
    req.checkBody("tbEmail", "Email name is required").notEmpty();
    req.checkBody("tbOsis", "OSIS must be 9 numbers").isLength({ min: 9, max: 9 });

    req.checkBody("tbCOsis", "OSIS does not match").equals(post.tbOsis);

    let err = req.validationErrors();

    console.log(post);

    if (err) {
        res.render("account/register", {
            title: "Register Account",
            csrfToken: req.csrfToken(),
            errors: err
        });
    } else {
        let p = new Profile({
            firstName: post.tbFirst.trim(),
            midName: post.tbMiddle.trim(),
            lastName: post.tbLast.trim(),
            ethnicityID: parseInt(post.ddlRace),
            genderID: parseInt(post.ddlGender),
            genderOther: "",
            pathwayID: parseInt(post.ddlPath),
            dob: post.tbDOB
        });
                
        p.save((err, context) => {

            if(err){
                console.log(err);
                return console.error(err.msg);
            }
            
            genProSkills(context.insertId);

            let date = new Date(),
                dateStr = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

            let a = new Account({
                OSIS: post.tbOsis.trim(),
                email: post.tbEmail.trim() + "@aoiths.org",
                dateCreated: dateStr,
                lastLogin: dateStr,
                lastUpdate: dateStr,
                profileID: context.insertId,
                accountTypeID: 5
            });

            // COMMENTED OUT FOR PRIOR TESTING
            a.save((err, context, rand) => {
                if(err){
                    console.error(err);
                } else {
                    var data = a.model.osis +  a.model.email;

                    let obj = {
                        accountID: context.insertId,
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
*/

router.get("/Confirmation", function(req, res) {

    res.render("account/confirm", {
        title: "Confirm Account"
    });

});


// FINISH VERIFICATION -> CONTROLLER.ACCOUNT VERIFYACCOUNT
router.get("/Verify/:token", function(req, res) {
    let account = new Account();
    let t = req.params.token;

    console.log(t);

    account.verifyAccount(t, function(err) {
        if (err) console.error(err);
        res.render("account/verify", {
            title: "Verification"
        });
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

    acc.getAccountByEmail(email + "@aoiths.org", function(err, user) {
        console.log("EMAIL");
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false, { message: 'Email Is Not Registered!' });
        }
        
        acc.comparePassword(password, user.password, function(err, isMatch) {
            if (err) throw err;
            isMatch = true;
            if (isMatch) {
                console.log(user);
                return done(null, user);
            } else {
                return done(null, false, { message: 'Invalid Password!' });
            }
        });

    });
}));

// SECTION TO SET TO ACCOUNT.ID
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
}), function(req, res) {
    // console.log(req.body);
    // console.log(req.user);
    res.redirect("/Student");
});


router.get("/Logout", function(req, res) {
    req.logOut();

    req.flash("success_msg", "You are logged out");
    res.redirect("/Account/Login");
});


router.get("/", csrfProtection, function(req, res) {

    console.log("TEST");

    res.render("Account/index", {
        title: "Update Account Information"
    });

});

module.exports = router;