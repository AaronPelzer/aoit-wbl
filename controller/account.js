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

    var d = new Date();

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


    var changes = {
        osis: 123456987
    };

    res.render("account/register", {
        title: "Register Account"
    });
});

router.post("/Register", function(req, res) {
    console.log("HIT");
    console.log(req.body);
});

router.get("/Login", function(req, res) {

    res.render("account/login", {
        title: "Login"
    });
});


module.exports = router;
