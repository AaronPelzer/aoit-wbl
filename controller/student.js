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
    Certification = require('../model/certification'),
    ProSkill = require('../model/professional'),
    ProAssess = require('../model/professionalAssessment'),
    ProSkillTypes = require('../model/professionalType');


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
    student.getOne(req.user.ID, (err, data) => {
        res.render("student/index", {
            title: "Index",
            student: data
        })
    })
});

router.get('/Profile', isAuthenticated, function(req, res) {
    let student = new Student();
    student.getOne(req.user.ID, (err, data) => {
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
            student.getOne(req.user.ID, cb);
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

    student.update(req.user.ID, items, (err) => {
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
    let student = new Student();
    student.getProfileID(req.user.ID, (err, id) => {
        if(err) throw err;
        course.get(id, (err, data) => {
            res.render("student/courses", {
                title: "Student Courses",
                courses: data
            });
        });
    });
});

router.post("/Courses/create", isAuthenticated, function(req, res){
    let p = req.body;
    let student = new Student();
    student.getProfileID(req.user.ID, (err, id) => {
        let c = new Course({
            title: p.tbCourses,
            year: p.ddlYear,
            hours: p.tbHours,
            termID: p.ddlTerm,
            profileID: id
        });
    
        c.save((err, data) => {
            if(err) throw err;
        });
    });
})

router.post("/Courses/remove", isAuthenticated, (req, res) => {
    let c = new Course();
    c.remove(req.body.id, (err, data) => {
        if(err) throw err;
    });
});

/**
 * 
 * TECHNICAL SKILLS
 * 
 */

router.get("/Technical", isAuthenticated, function(req, res) {
    let tech = new TechSkill();
    let student = new Student();
    student.getProfileID(req.user.ID, (err, id) => {
        tech.get(id, (err, data) => {
            console.log(data);
            res.render('student/technical', {
                title: "Technical",
                technical: data
            })
        });
    })
});

router.post("/Technical/Create", isAuthenticated, (req, res) => {
    let p = req.body;
    let student = new Student();
    student.getProfileID(req.user.ID, (err, id) => {
        let t = new TechSkill({
            skill: p.tbTech,
            profileID: id
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
});

router.put("/Technical/", isAuthenticated, (req, res) => {
    let p = req.body;
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
    let pro = new ProSkill();
    let student = new Student();
    let payload = {};
    student.getProfileID(req.user.ID, (err, id) => {
        let skills = new ProSkillTypes();
        skills.get((err, data) => {
            payload.skills = data;
            pro.get(id, (err, data) => {
                console.log(id, data);
                payload.professional = data;
                res.render('student/professional', {
                    title: "Professional",
                    results: payload
                })
            });
        })
    });
});

router.post("/Professional", isAuthenticated, (req, res) => {
    let p = req.body;
    let student = new Student();
    student.getProfileID(req.user.ID, (err, id) => {
        let t = new ProSkill({
            professionalSkillID: p.ddlPro,
            profileID: id
        });
    
        t.save((err, data) => {
            console.log(data);
    
            let a = new ProAssess({
                grade: p.ddlGrade,
                studentScore: p.ddlScale,
                professionalID: data.insertId
            });
    
            a.save((err, data) => {
                if(err) throw err;
            })
        })
    });
});


router.put("/Professional/", isAuthenticated, (req, res) => {
    let p = req.body;
    let proAccess = new ProAssess();
    let assessments = p.arr;
    assessments.forEach((a) => {
        let grade = parseInt(a.slice(0,2));
        let score = parseInt(a.slice(2));
        proAccess.exists(p.id, grade, (r, id) => {
            console.log(p.id, grade, r, id);
            if(!isNaN(score) && r){
                updateProAssessment(id, score);
            } else if(!isNaN(score) && !r) {
                addProAssessment(grade, score, p.id);
            }
        });
    })
});

function updateProAssessment(id, score){
    let pro = new ProAssess();
    pro.update(id, {studentScore: score}, (err, data) => {
        if(err) throw err;
        else console.log("Assessment Updated!");
    }); 
}

function addProAssessment(grade, score, proId){
    let pro = new ProAssess({
        grade: grade,
        studentScore: score,
        professionalID: proId
    });
    pro.save((err, data) => {
        if(err) throw err;
    })
}

router.delete("/Professional/", isAuthenticated, (req, res) => {
    let p = new ProSkill();
    p.remove(req.body.id, (err, data) => {
        if(err) throw err;
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
    let student = new Student();
    student.getProfileID(req.user.ID, (err, id) => {
        a.get(id, (err, data) => {
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
});

router.post("/WBL/Create", isAuthenticated, function(req, res){
    let p = req.body;
    let student = new Student();
    student.getProfileID(req.user.ID, (err, id) => {
        var c = new Comment({
            comment: p.tbComment
        });
    
        c.save((err, data) => {
            var wbl = new WBL({
                date: p.tbDate,
                hours: p.tbHours,
                organization: p.tbOrg,
                wblTypeID: p.ddlWblType,
                commentID: data.insertId,
                profileID: id
            });    
    
            wbl.save((err) => {
                if(err) throw err;
            });
        })
    });
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
    let student = new Student();
    student.getProfileID(req.user.ID, (err, id) => {
        certification.get(id, (err, data) => {
            if (err) throw err;
            console.log(data);
            res.render('student/certification', {
                title: "Certification",
                certification: data
            })
        })
    })
});

router.post("/Certification", isAuthenticated, (req, res) => {
    let p = req.body;
    let student = new Student();
    student.getProfileID(req.user.ID, (err, id) => {
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
                    profileID: id
                });    
    
                certification.save((err) => {
                    cb(err, "done");
                });
            }
        ], (err, result) => {
            if (err) throw err;
            res.redirect('/certification');
        });
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