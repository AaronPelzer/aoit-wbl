var router = require("express")(),
    sqlite = require('sqlite3').verbose(),
    db = new sqlite.Database('./data');

var commands = {
    createTable: "INSERT INTO profile (firstName, mI, lastName, genderId, genderOther, dob)",
    selectCluster: "SELECT * FROM cluster",
    selectRace: "SELECT * FROM race",
    selectSkills: "SELECT * from skills"
};

function processData() {

}

function getCluster() {
    var q = 'SELECT * FROM cluster';
    var cluster = [];

    execute(q, [], function(err, data) {

        for (var x = 0; x < data.length; x++) {

            cluster.push(data[x]);
        }

        return data;
    });

    return cluster;
}

// console.log(getCluster());

// CALLBACK(ERR)
// CALLBACK(ERR, DATA)
function execute(query, params, callback) {
    db.prepare(query).all(params, callback);
}


router.get("/Profile", function(req, res) {

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


    /*
        execute('SELECT * FROM cluster', [], function(err, data) {
            res.render("student/profile", {
                title: "Profile",
                results: payload
            });
        });
        */
});



router.get("/Courses", function(req, res) {
    console.log("Courses");

    res.render("student/courses", {
        title: "CTE Courses"
    });
});


router.get("/Technical", function(req, res) {
    console.log("Technical");

    res.render("student/technical", {
        title: "Technical Skills"
    });
});

router.post("/Technical", (req, res) => {
    console.log("HIT");
    console.log(req.body);
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

module.exports = router;