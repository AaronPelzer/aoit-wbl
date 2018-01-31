const router = require("express")(),
      async = require('async'),
      Course = require('../model/course'),
      Comment = require('../model/comment'),
      Student = require('../model/profile'),
      TechSkill = require('../model/technical'),
      Assessment = require('../model/assessment'),
      Cluster = require('../model/cluster'),
      Race = require('../model/race'),
      IdeaStatus = require('../model/ideaStatus'),
      Gender = require('../model/gender');



function isAuthenticated(req, res, next){

    if(req.isAuthenticated()){
        return next();
    } else {
        req.flash("error_msg", "You are not logged in");
        res.redirect("/Account/Login");
    }
}

router.get("/Profile", isAuthenticated, (req, res) => {
    res.render("student/index", {
        title: "Index"
    })
});

router.get('/Info', isAuthenticated, function(req, res){
    let student = new Student();
    student.getOne(req.user.profileID, (err, data) => {
        res.render("student/info", {
            title: "Basic Information",
            info: data[0]
        })
    });
})

router.get("/Info/Edit", isAuthenticated, (req, res) => {
    let payload = {};
    async.parallel({
        student: (cb) => {
            let student = new Student();
            student.getOne(req.user.profileID, cb);
        },
        cluster: (cb) => {
            let cluster = new Cluster();
            cluster.get(cb);        
        },
        race: (cb) => {
            let race = new Race();
            race.get(cb);
        },
        ideaStatus: (cb) => {
            let status = new IdeaStatus();
            status.get(cb);
        },
        gender: (cb) => {
            let gender = new Gender();
            gender.get(cb);
        }
    }, (err, r) => {
        payload.cluster = r.cluster;
        payload.race = r.race;
        payload.ideaStatus = r.ideaStatus;
        payload.gender = r.gender;
        payload.student = r.student;
        
        res.render("student/profile", {
            title: "Profile",
            results: payload
        });
    });
});

router.post("/Info/Edit", isAuthenticated, (req, res) => {
    let student = new Student(),
        p = req.body,
        items = {
            genderID: p.tbGender,
            clusterID: p.tbCluster,
            raceID: p.tbRace,
            hispanicID: p.tbHispanic,
            ideaStatusID: p.tbIdeaStatus
        }

        if(p.GOther){
            items.genderOther = p.tbGOther;
        }

        if(p.ROther){
            items.raceOther = p.tbROther;
        }

        student.update(req.user.profileID, items, () => {
            res.redirect("/student/info");
        })
});

router.get("/Courses", isAuthenticated, function(req, res) {
    let course = new Course();
    course.get(req.user.profileID, (err, data) => {
        res.render("student/courses", {
            title: "Student Courses",
            courses: data
        });
    });
});

router.post("/newCourse", isAuthenticated, function(req, res){
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

router.post("/updateCourses", isAuthenticated, function(req, res){
    var data = req.body;
    console.log(data);
})

router.get("/Technical", isAuthenticated, function(req, res) {
    let t = new TechSkill();
    t.get(req.user.profileID, (err, data) => {
        res.render("student/technical", {
            title: "Technical Skills",
            techSkills: data 
        });
    });
});

router.post("/newTech", isAuthenticated, (req, res) => {
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


router.get("/Professional", isAuthenticated, function(req, res) {
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


router.get("/Activities", isAuthenticated, function(req, res) {

    execute("SELECT * FROM wblType ORDER BY type ASC", [], function(err, data) {

        res.render("student/activities", {
            title: "Work Based Learning Activities",
            results: data
        });
    });

});

router.get("/upload", isAuthenticated, function(req, res) {
    res.render("student/upload", {
        title: "Upload Documents"
    });
})

router.post('/upload', isAuthenticated, function(req, res){
    uploadUtil.setDestination(1234567890);
    uploadUtil.upload("myFile", "resume", req, res);
    res.status(204).end();
});

module.exports = router;
