var router = require("express")(),
    sqlite = require('sqlite3').verbose(),
    Address = require('../model/address'),
    School = require('../model/school');


router.get("/", function(req, res) {
    res.render("admin/index", {
        title: "Administration",
    });
});

router.get("/evaluator", function(req, res) {
    res.render("admin/evaluator", {
        title: "Industry-Based Assessments"
    });
});

router.post("/evaluator", function(req, res) {

});

router.get("/schools", function(req, res) {
    res.render("admin/school/index", {
        title: "School Management"
    })
});

router.get("/schools/new", function(req, res) {
    res.render("admin/school/add", {
        title: "Add New School"
    });
});

router.post("/schools/new", function(req, res) {
    var data = req.body;

    // Create objects first then validate
    req.checkBody("tbName", "School name is required.").notEmpty();
    req.checkBody("tbAddress", "School address is required.").notEmpty();
    req.checkBody("tbPhone", "School phone number is required.").notEmpty();

    let err = req.validationErrors();

    if(err){
        console.log(err);
        //err flash goes here
    } else {
        let a = new Address({
            address: data.tbAddress.trim(),
            address2: data.tbAddress2.trim(),
            city: data.tbCity.trim(),
            state: data.tbState.trim(),
            zip: data.tbZip.trim()
        });

        let s = new School({
            name: data.tbName.trim(),
            addressId: 0
        }, a.model);

        console.log(s.model);

        s.save((status) => {
            if(status){
                res.send("Success");
            }
        });
    }

});

module.exports = router;