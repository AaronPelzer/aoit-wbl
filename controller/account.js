var router = require("express")(),
    Account = require("../model/account.js"),
    Profile = require("../model/profile.js"),
    csrf = require("csurf");

var csrfProtection = csrf({cookie: true}); 

// SELF CONTAINED MVC DESIGN
router.get("/Register", csrfProtection,  function(req, res) {


    // INSERT 
    /*
    //
    var d = new Date();

    let p = new Profile({
        firstName: "Aaron",
        midName: "M",
        lastName: "Pelzer",
        genderId: 2,
        dob: "10/10/2017"
    });

    // ACTION TO INSERT
    p.save();

    console.log("ID: " + p.model.ID);

    */

    /*
    //
    GET ONE
    let p = new Profile();

    p.getOne(4, function(data){
        console.log(data);
    });
    */


    /* DELETE
    // 
    let p = new Profile();

    p.remove(35, (data) => {
        console.log(this);
    })

    */


    /*
    //
    let a = new Account({
        osis: 12312321,
        email: "user@aoit.org",
        password: "somepasswordthatishash",
        dateCreated: d.getDate(),
        profileID: 0,
        accountTypeId: 1,
        lastLogin: "",
        lastUpdate: ""
    }, p.model);

    a.save();
    */


    /* GET ALL
    // 
    let a = new Account();

    a.get(function(data){
        console.log("DATA!!");

        console.log(data);
    });

    */




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
        firstName: post.tbFirst,
        midName: post.tbMiddle,
        lastName: post.tbLast,
        genderId: 0
    });

    let a = new Account({
        osis: post.tbOsis,
        email: post.tbEmail + "@aoiths.org",
        password: post.tbPass,
        dateCreated: d.getDate(),
        profileID: 0,
        accountTypeId: 1,
        lastLogin: "",
        lastUpdate: ""
    }, p.model);

    a.save();
    
    console.log(a);

    res.send("Being Processed");
});



router.get("/Login", function(req, res) {

    res.render("account/login", {
        title: "Login"
    });
});


module.exports = router;