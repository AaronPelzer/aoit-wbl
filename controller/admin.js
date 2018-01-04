var router = require("express")(),
    sqlite = require('sqlite3').verbose(),
    db = new sqlite.Database('./wbl');


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
    res.render("school/index", {
        title: "School Management"
    })
});

router.get("/schools/new", function(req, res) {
    res.render("school/add", {
        title: "Add New School"
    });
});

router.post("/schools/new", function(req, res) {

});

module.exports = router;