const router = require("express")(),
      async = require('async'),
      Course = require('../model/course'),
      Comment = require('../model/comment'),
      Student = require('../model/profile'),
      TechSkill = require('../model/technical'),
      Assessment = require('../model/assessment');



function isAuthenticated(req, res, next){

    if(req.isAuthenticated()){
        return next();
    } else {
        req.flash("error_msg", "You are not logged in");
        res.redirect("/Account/Login");
    }
}

router.get("/Profile", isAuthenticated, function(req, res) {

    var payload = {};

    execute(commands.selectCluster, [], function(err, data) {
        payload.cluster = data;
        execute(commands.selectRace, [], function(err, data) {
            payload.race = data;

            var r = payload;

            console.log(r.cluster[0]);

            res.render("student/profile", {
                title: "Profile",
                results: payload
            });

        });
    });
});

router.get('/Info', function(req, res){
    let student = new Student();
    student.getOne(req.user.profileID, (err, data) => {
        res.render("student/info", {
            title: "Basic Information",
            info: data[0]
        })
    });
})

router.get("/Courses", function(req, res) {
    let course = new Course();
    course.get(req.user.profileID, (err, data) => {
        res.render("student/courses", {
            title: "Student Courses",
            courses: data
        });
    });
});

router.post("/newCourse", function(req, res){
    let p = req.body;
    for(var i in p){
        let c = new Comment({
            comment: p[i].comment
        });

        async.waterfall([
            (cb) => {
                c.save((err, data) => {
                    cb(err, data['MAX(ID)']);
                });
            }, (commentID, cb) => {
                let course = new Course({
                    title: p[i].title,
                    year: p[i].year,
                    hours: p[i].hours,
                    termID: p[i].term   
                }, commentID, req.user.profileID);    

                course.save((err) => {
                    cb(err, "done");
                });
            }
        ], (err, result) => {
            if(err) throw err;
            res.redirect('/courses');
        });
    }
})

router.post("/updateCourses", function(req, res){
    var data = req.body;
    console.log(data);
})

router.get("/Technical", function(req, res) {
    let t = new TechSkill();
    t.get(req.user.profileID, (err, data) => {
        res.render("student/technical", {
            title: "Technical Skills",
            techSkills: data 
        });
    });
});

router.post("/newTech", (req, res) => {
    console.log('-----------------reached');
    let p = req.body;
    for(var i in p){
        let a = new Assessment({
            selfEval: p[i].scale,
            grade: p[i].grade
        });

        async.waterfall([
            (cb) => {
                a.save((err, data) => {
                    cb(err, data['MAX(ID)']);
                    console.log(data);
                });
            }, (assessmentID, cb) => {
                let techSkill = new TechSkill({
                    skill: p[i].skill   
                }, assessmentID, req.user.profileID);    

                techSkill.save((err) => {
                    cb(err, "done");
                });
            }
        ], (err, result) => {
            if(err) throw err;
            res.redirect('/technical');
        });
    }
});


router.get("/Professional", function(req, res) {
    execute(commands.selectSkills, [], function(err, data) {
        if (err) {
            console.error(err);
        }
        console.log(data);

        res.render("student/professional", {
            title: "Professional Skills",
            results: data
        });
    });
});


router.post("/Register", (req, res) => {
    console.log("HIT");
    console.log(req.body);
});


router.get("/Activities", function(req, res) {

    execute("SELECT * FROM wblType ORDER BY type ASC", [], function(err, data) {

        res.render("student/activities", {
            title: "Work Based Learning Activities",
            results: data
        });
    });

});

router.get("/upload", function(req, res) {
    res.render("student/upload", {
        title: "Upload Documents"
    });
})

router.post('/upload', function(req, res){
    uploadUtil.setDestination(1234567890);
    uploadUtil.upload("myFile", "resume", req, res);
    res.status(204).end();
});

module.exports = router;
