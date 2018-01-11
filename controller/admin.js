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

router.get("/schools/:id/edit", (req, res) => {
    res.render("admin/school/edit", {
        title: "Edit school"
    });
});

router.post("/schools/:id/edit", (req, res) => {
    let s = new School();
    let schoolData = req.body.tbName;
    let addressData = {
        address: req.body.tbAddress.trim(),
        address2: req.body.tbAddress2.trim(),
        city: req.body.tbCity.trim(),
        state: req.body.tbState.trim(),
        zip: req.body.tbZip.trim()
    }

    for(var key in addressData){
        if(addressData[key] == '' || addressData[key] == null){
            delete addressData[key];
        }
    }

    s.update(req.params.id, {name: schoolData}, () => {
        s.selectOne(req.params.id, { 'addressId': 'id' }, (data) => {
            let a = new Address(); 
            a.update(data.id, addressData, () => {
                res.send("success!");
            });
        })
    });
});

module.exports = router;