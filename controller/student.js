/* WILL REMOVE IN NEXT UPDATE
var db = require("../lib/sqlite-wrapper.js")('./wbl', true),
    router = require("express")(),
    Student = require("./student.js"),
    tableName = "profile",
    uploadUtil = require('../util/upload.js');

*/

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
    Gender = require('../model/gender'),
    WBL = require('../model/wblActivity'),
    WBLType = require('../model/wblType'),
    Certification = require('../model/certification');


function isAuthenticated(req, res, next) {

    if (req.isAuthenticated()) {
        return next();
    } else {
        req.flash("error_msg", "You are not logged in");
        res.redirect("/Account/Login");
    }
}

router.get("/", isAuthenticated, (req, res) => {
    let student = new Student();
    student.getOne(req.user.profileID, (err, data) => {
        res.render("student/index", {
            title: "Index",
            student: data[0]
        })
    })
});

router.get('/Profile', isAuthenticated, function(req, res) {
    let student = new Student();
    student.getOne(req.user.profileID, (err, data) => {
        res.render("student/info", {
            title: "Basic Information",
            info: data[0]
        })
    });
})

router.get("/Profile/Edit", isAuthenticated, (req, res) => {
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

        console.log(r);

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
            dob: p.tbDOB,
            genderID: p.tbGender,
            clusterID: p.tbCluster,
            raceID: p.tbRace,
            hispanicID: p.tbHispanic,
            ideaStatusID: p.tbIdeaStatus
        }

    if (p.GOther) {
        items.genderOther = p.tbGOther;
    }

    if (p.ROther) {
        items.raceOther = p.tbROther;
    }

    student.update(req.user.profileID, items, (err) => {
        res.redirect("/student/info");
    })
});

/**
 * 
 * COURSES
 * 
 */

router.get("/Courses", isAuthenticated, function(req, res) {
    let course = new Course();
    course.get(req.user.profileID, (err, data) => {
        console.log(data);
        res.render("student/courses", {
            title: "Student Courses",
            courses: data
        });
    });
});

/*
    execute(commands.selectCluster, [], function(err, data) {
        payload.cluster = data;
        execute(commands.selectRace, [], function(err, data) {
            payload.race = data;

router.post("/newCourse", isAuthenticated, function(req, res){
    let p = req.body;
    for(var i in p){
        let c = new Comment({
            comment: p[i].comment
        });
        console.log("i: " + i);
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

            if(i == p.length - 1){
                res.redirect('/');
            }
        });
    }
})

router.get("/courses/:id/update", isAuthenticated, (req, res) => {
    let c = new Course();
    let payload = {};
    async.waterfall([
        (cb) => {
            c.getOne(req.params.id, (err, data) => {
                payload.course = data;
                cb(err, data.ID);
            });
        }, (courseID, cb) => {
            let comment = new Comment();
            comment.getOne(courseID, (err, data) => {
                payload.comment = data;
                cb(err, "done");
            });
        }
    ], (err, results) => {
        if(err) throw err;

        res.render('student/updateCourse', {
            title: "Edit course",
            results: payload
        })
    })
});

router.post("/courses/:id/update", isAuthenticated, function(req, res){
    let p = req.body,
        courseItems = {
            title: p.tbTitle,
            year: p.tbYear,
            hours: p.tbHour,
        };

    async.parallel({
        course: (cb) => {
            let course = new Course();
            course.update(req.params.id, courseItems, (err) => {
                cb(err);
            });
        },
        comment: (cb) => {
            let comment = new Comment(),
                c = new Course();

            c.select(req.params.id, ["commentID"], (err, data) => {
                comment.update(data[0].commentID, {comment: p.tbComment}, (err) => {
                    cb(err);
                })
            });
        }
    }, (err) => {
        if(err) throw err;
        res.redirect('/student/courses');
    })
})

/**
 * 
 * TECHNICAL SKILLS
 * 
 */

router.get("/Technical", isAuthenticated, function(req, res) {
    let tech = new TechSkill();
    tech.get(req.user.profileID, (err, data) => {
        console.log(data);
        res.render("student/technical", {
            title: "Student Technical Skills",
            results: data
        });
    });
});

router.get('/Info', function(req, res) {
    console.log("Info");

    res.render("student/info", {
        title: "Basic Information"
    });
});

router.post("/newTech", isAuthenticated, (req, res) => {
    let p = req.body;
    for (var i in p) {
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
            if (err) throw err;
            res.redirect('/technical');
        });
    }
});

router.get("/Technical/:id/update", isAuthenticated, (req, res) => {
    let t = new TechSkill();
    t.selectOne(req.params.id, { 'assessment': 'assessment.ID=technical.assessmentID' }, null, (err, data) => {
        res.render("student/technical.update.ejs", {
            title: "Update Technical Skill",
            results: data
        });
    });
});

router.post("/Technical/:id/update", isAuthenticated, (req, res) => {
    let p = req.body;

    async.parallel({
        tech: (cb) => {
            let t = new TechSkill();
            t.update(req.params.id, { skill: p.tbTech }, cb);
        },
        assessment: (cb) => {
            let t = new TechSkill(),
                a = new Assessment();

            t.selectOne(req.params.id, null, ["assessmentID"], (err, data) => {
                a.update(data.assessmentID, { grade: p.ddlGrade, selfEval: p.ddlScale }, cb);
            });
        }
    }, (err, results) => {
        if (err) throw err;
        console.log("reached");
        res.redirect('/student/technical');
    });
});

/**
 * 
 * PROFESSIONAL SKILL
 * 
 */

router.get("/Professional", isAuthenticated, function(req, res) {

    res.render("student/professional", {
        title: "Professional Skills",
        results: {}
    });
});

/**
 * 
 * WORK-BASED LEARNING
 * 
 */

router.get("/WBL", isAuthenticated, function(req, res) {
    async.parallel({
        wblType: function(cb) {
            let wblType = new WBLType();
            wblType.get(cb);
        },
        activities: function(cb) {
            let activities = new WBL();
            activities.get(req.user.profileID, cb);
        }
    }, function(err, results) {
        res.render('student/activities', {
            title: "WBL",
            results: results
        })
    });
});

router.post("/newActivity", isAuthenticated, function(req, res) {
    let p = req.body;
    for (var i in p) {
        console.log(p[i]);

        var c = new Comment({
            comment: p[i].comment
        });

        c.save((err, data) => {
            var wbl = new WBL({
                date: p[i].date,
                hours: p[i].hours,
                organization: p[i].org,
                wblTypeID: p[i].wblType
            }, data['MAX(ID)'], req.user.profileID);

            wbl.save((err) => {});
        })
    }
    res.redirect('/Wbl');
});

router.get("/WBL/:id/update", isAuthenticated, (req, res) => {
    async.parallel({
        wblType: function(cb) {
            let wblType = new WBLType();
            wblType.get(cb);
        },
        activity: function(cb) {
            let activities = new WBL();
            activities.getOne(req.params.id, cb);
        }
    }, function(err, results) {
        console.log(results);
        res.render('student/updateWbl', {
            title: "WBL",
            results: results
        })
    });
});

router.post("/WBL/:id/update", isAuthenticated, function(req, res) {
    let p = req.body,
        wblItems = {
            date: p.tbDate,
            organization: p.tbOrg,
            hours: p.tbHour,
            wblTypeID: p.wblType
        };

    async.parallel({
        wbl: (cb) => {
            let wbl = new WBL();
            wbl.update(req.params.id, wblItems, (err) => {
                cb(err);
            });
        },
        comment: (cb) => {
            let comment = new Comment(),
                wbl = new WBL();

            wbl.select(req.params.id, ["commentID"], (err, data) => {
                console.log(data);
                comment.update(data[0].commentID, { comment: p.tbComment }, (err) => {
                    cb(err);
                });
            });
        }
    }, (err) => {
        if (err) throw err;
        res.redirect('/student/activities');
    })
});

/**
 * 
 * CERTIFICATION
 * 
 */

router.get("/Certification", isAuthenticated, (req, res) => {
    let certification = new Certification();
    certification.get(req.user.profileID, (err, data) => {
        if (err) throw err;
        res.render('student/certification', {
            title: "Certification",
            results: data
        })
    })
});

router.post("/Certification/new", isAuthenticated, (req, res) => {
    let p = req.body;
    for (var i in p) {
        let c = new Comment({
            comment: p[i].comment
        });

        async.waterfall([
            (cb) => {
                c.save((err, data) => {
                    cb(err, data['MAX(ID)']);
                });
            }, (commentID, cb) => {
                let certification = new Certification({
                    name: p[i].name,
                    date: p[i].date,
                    authority: p[i].authority,
                    score: p[i].score
                }, commentID, req.user.profileID);

                certification.save((err) => {
                    cb(err, "done");
                });
            }
        ], (err, result) => {
            if (err) throw err;
            res.redirect('/certification');
        });
    }
})

router.get("/Certification/:id/update", isAuthenticated, (req, res) => {
    let certification = new Certification();
    certification.getOne(req.params.id, (err, data) => {
        console.log(data);
        res.render('student/certification.update.ejs', {
            title: "Update Certification",
            results: data
        })
    })
});

router.post("/Certification/:id/update", isAuthenticated, (req, res) => {
    let p = req.body,
        certItems = {
            name: p.tbTitle,
            authority: p.tbAuth,
            date: p.tbDate,
            score: p.tbScore
        };

    async.parallel({
        certification: (cb) => {
            let certification = new Certification();
            certification.update(req.params.id, certItems, (err) => {
                cb(err);
            });
        },
        comment: (cb) => {
            let comment = new Comment(),
                certification = new Certification();

            certification.select(req.params.id, ["commentID"], (err, data) => {
                comment.update(data[0].commentID, { comment: p.tbComment }, (err) => {
                    cb(err);
                });
            });
        }
    }, (err) => {
        if (err) throw err;
        res.redirect('/student/certification');
    })
});

router.get("/upload", isAuthenticated, function(req, res) {
    res.render("student/upload", {
        title: "Upload Documents"
    });
})


router.post('/upload', isAuthenticated, function(req, res) {
    uploadUtil.setDestination(1234567890);
    uploadUtil.upload("myFile", "resume", req, res);
    res.status(204).end();
});

module.exports = router;