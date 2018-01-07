var router = require("express")(),
    Account = require("../model/account.js"),
    Profile = require("../model/profile.js");
/*
    sqlite = require('sqlite3').verbose(),
    db = new sqlite.Database('./wbl');

var commands = {
    insertProfile: "INSERT INTO profile(firstName, mI, lastName, genderId, genderOther, dob) VALUES(?,?,?,?,?,?)",
    insertAccount: "INSERT INTO account(OSIS, email, profileID) VALUES(?,?,?)"
}
*/


// SELF CONTAINED MVC DESIGN
router.get("/Register", function(req, res) {


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
        title: "Register Account"
    });
});

router.post("/Register", function(req, res) {
    console.log("HIT");
    console.log(req.body);


    var d = new Date();

    // TEST DATA
    let p = new Profile({
        firstName: "Aaron",
        midName: "M",
        lastName: "Pelzer",
        genderId: 2,
        dob: "10/10/2017"
    });

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

    // 
});



router.get("/Login", function(req, res) {

    res.render("account/login", {
        title: "Login"
    });
});


module.exports = router;