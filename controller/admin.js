var router = require("express")(),
    csrf = require("csurf"),
    // sqlite = require('sqlite3').verbose(),
    Address = require('../model/address'),
    School = require('../model/school'),
    User = require('../model/profile'),
    Course = require('../model/course'),
    Technical = require('../model/technical'),
    passport = require("passport"),
    LocalStrategy = require("passport-local").Strategy,
    crypto = require('crypto'),
    bcrypt = require("bcryptjs");
    

    // ADDED
let csrfProtection = csrf({ cookie: true });

// ACCOUNTS
router.get("/Login", csrfProtection, function(req, res) {
    res.render("admin/accounts/login", {
        title: "Administration",
        csrfToken: req.csrfToken()
    });
});

router.post("/Login", csrfProtection, passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/Administration/Login",
    failureFlash: true
}), function(req, res) {
    // console.log(req.body);
    // console.log(req.user);
    res.redirect("/Administration");
});

// NEXT -> *
router.get("/Account/SetPass", function(req, res){
    res.render("admin/accounts/set", {
        title: "Set Password For Account"
    });
});



// USERS
router.get("/Manage/Users", csrfProtection, function(req, res){
    res.render("admin/accounts/index", {
        title: "Account Management",
        csrfToken: req.csrfToken()
    });
});



// PREVIOUS
router.get("/", function(req, res) {
    res.render("admin/index", {
        title: "Administration"
    });
});

router.get("/evaluator", function(req, res) {
    res.render("admin/evaluator", {
        title: "Evaluators"
    });
});

router.get("/View/Students/", (req, res) => {
    res.render("admin/student/index", {
        title: "Students"
    })
})

router.get("/Students", (req, res) => {
    let user = new User();
    console.log(req.query);
    user.getAllStudents(req.query, (err, students, fields) => {
        res.json(students);
    });
});

router.get("/View/Students/:student", (req, res) => {
    res.render("admin/student/info", {
        title: "Student Info"
    });
});

router.get("/Students/:student", (req, res) => {
    let user = new User();
    user.getOneWithInfo(req.params.student, (err, student) => {
        let course = new Course();
        course.get(req.params.student, (err, courses) => {
            student.courses = courses;
            let technical = new Technical();
            technical.get(req.params.student, (err, technical) => {
                student.technical = technical;
                res.json(student);
            })
        })
    });
})

router.put("/Students/:student", (req, res) => {
    let post = req.body,
        user = new User();

    let items = {
        firstName: req.params.tbFirst,
        midName: req.params.tbMid,
        lastName: req.params.tbLast,
        grade: req.params.ddlGrade,
        genderID: req.params.ddlGender,
        genderOther: req.params.tbGOther,
        pathwayID: req.params.ddlPatway,
        ideaStatus: req.params.ddlIdea
    };

    user.update(req.params.student, items, (err, data) => {
        res.send("updated");
    });
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
    // let s = new School();
    // let schoolData = req.body.tbName.trim();
    // let addressData = {
    //     address: req.body.tbAddress.trim(),
    //     address2: req.body.tbAddress2.trim(),
    //     city: req.body.tbCity.trim(),
    //     state: req.body.tbState.trim(),
    //     zip: req.body.tbZip.trim()
    // }

    // for(var key in addressData){
    //     if(addressData[key] == '' || addressData[key] == null){
    //         delete addressData[key];
    //     }
    // }

    // s.update(req.params.id, {name: schoolData}, () => {
    //     s.selectOne({ 'addressId': 'id' }, 'id', req.params.id, (data) => {
    //         let a = new Address(); 
    //         a.update(data.id, addressData, () => {
    //             res.send("success!");
    //         });
    //     })
    // });
});

module.exports = router;