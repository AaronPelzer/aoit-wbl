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
    TechAssess = require('../model/technicalAssessment'),
    Cluster = require('../model/cluster'),
    Race = require('../model/ethnicity'),
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
        console.log(req.user);
        console.log(data);
        res.render("student/index", {
            title: "Index",
            student: data
        })
    })
});

router.get('/Profile', isAuthenticated, function(req, res) {
    let student = new Student();
    console.log(req.user);

    student.getOne(req.user.profileID, (err, data) => {
        res.render("student/info", {
            title: "Basic Information",
            info: data
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

        payload.cluster = r.cluster;
        payload.race = r.race;
        payload.ideaStatus = r.ideaStatus;
        payload.gender = r.gender;
        payload.student = r.student;

        // console.log(payload);

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
        console.log("HERE");
        console.log(data);
        res.render("student/courses", {
            title: "Student Courses",
            courses: data
        });
    });
});

router.post("/Courses/create", isAuthenticated, function(req, res){
    let p = req.body;
    console.log(p);

    let c = new Course({
        title: p.tbCourses,
        year: p.ddlYear,
        hours: p.tbHours,
        termID: p.ddlTerm,
        profileID: req.user.profileID
    });

    c.save((err, data) => {
        if(err) throw err;
    });
})

router.post("/Courses/remove", isAuthenticated, (req, res) => {
    let c = new Course();
    c.remove(req.body.id, (err, data) => {
        if(err) throw err;
    });
});

/*
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
        res.render('student/technical', {
            title: "Technical",
            technical: data
        })
    });
});

router.get('/Info', function(req, res) {
    console.log("Info");

    res.render("student/info", {
        title: "Basic Information"
    });
});

router.post("/Technical/Create", isAuthenticated, (req, res) => {
    let p = req.body;
    console.log(p);
    
    let t = new TechSkill({
        skill: p.tbTech,
        profileID: req.user.profileID
    });

    t.save((err, data) => {
        console.log(data);

        let a = new TechAssess({
            grade: p.ddlGrade,
            studentScore: p.ddlScale,
            technicalSkillID: data.insertId
        });

        a.save((err, data) => {
            if(err) throw err;
        })
    })
});

router.get("/Technical/:id/update", isAuthenticated, (req, res) => {
    let t = new TechSkill();
    // let p = 
    // t.selectOne(req.params.id, { 'assessment': 'assessment.ID=technical.assessmentID' }, null, (err, data) => {
    //     res.render("student/technical.update.ejs", {
    //         title: "Update Technical Skill",
    //         results: data
    //     });
    // });
});

router.put("/Technical/", isAuthenticated, (req, res) => {
    let p = req.body;
    console.log("RESULTTTTTTTTTTTTT", p);
    let t = new TechAssess();
    let assessments = p.arr;
    assessments.forEach((a) => {
        let grade = parseInt(a.slice(0,2));
        let score = parseInt(a.slice(2));
        t.exists(p.id, grade, (r, id) => {
            if(!isNaN(score) && r){
                updateAssessment(id, score);
            } else if(!isNaN(score) && !r) {
                addAssessment(grade, score, p.id);
            }
        });
    })
});

function updateAssessment(id, score){
    let tech = new TechAssess();
    tech.update(id, {studentScore: score}, (err, data) => {
        if(err) throw err;
        else console.log("Assessment Updated!");
    }); 
}

function addAssessment(grade, score, techId){
    let tech = new TechAssess({
        grade: grade,
        studentScore: score,
        technicalSkillID: techId
    });
    tech.save((err, data) => {
        if(err) throw err;
    })
}

router.delete("/Technical/", isAuthenticated, (req, res) => {
    let t = new TechSkill();
    t.remove(req.body.id, (err, data) => {
        if(err) throw err;
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
    let payload = {};
    let a = new WBL();
    a.get(req.user.profileID, (err, data) => {
        payload.activities = data;
        let types = new WBLType();
        types.get((err, types) => {
            payload.types = types;
            console.log(payload);
            res.render('student/activities', {
                title: "Work-based Activities",
                results: payload
            })
        })
    });
});

router.post("/WBL/Create", isAuthenticated, function(req, res){
    let p = req.body;
    console.log(p);
    var c = new Comment({
        comment: p.tbComment
    });

    c.save((err, data) => {
        console.log(err, data);
        var wbl = new WBL({
            date: p.tbDate,
            hours: p.tbHours,
            organization: p.tbOrg,
            wblTypeID: p.ddlWblType,
            commentID: data.insertId,
            profileID: req.user.profileID
        });    

        wbl.save((err) => {
            if(err) throw err;
        });
    })
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

router.delete("/WBL/", (req, res) => {
    let a = new WBL();
    a.remove(req.body.id, (err, data) => {
        if(err) throw err;
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
        console.log(data);
        res.render('student/certification', {
            title: "Certification",
            certification: data
        })
    })
});

router.post("/Certification", isAuthenticated, (req, res) => {
    let p = req.body;

    async.waterfall([
        (cb) => {
            let c = new Comment({
                comment: p.tbComment
            });

            c.save((err, data) => {
                cb(err, data.insertId);
            });
        }, (commentID, cb) => {
            let certification = new Certification({
                name: p.tbName,
                date: p.tbDate,
                authority: p.tbAuth,
                score: p.tbScore,
                commentID: commentID,
                profileID: req.user.profileID
            });    

            certification.save((err) => {
                cb(err, "done");
            });
        }
    ], (err, result) => {
        if (err) throw err;
        res.redirect('/certification');
    });
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

router.delete("/Certification/", (req, res) => {
    let a = new Certification();
    a.remove(req.body.id, (err, data) => {
        if(err) throw err;
    });
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