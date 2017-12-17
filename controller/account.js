var router = require("express")(),
    sqlite = require('sqlite3').verbose(),
    db = new sqlite.Database('./wbl');



var commands = {
    insertProfile: "INSERT INTO profile(firstName, mI, lastName, genderId, genderOther, dob) VALUES(?,?,?,?,?,?)",
    insertAccount: "INSERT INTO account(OSIS, email, profileID) VALUES(?,?,?)"
}

router.get("/Register", function(req, res) {
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