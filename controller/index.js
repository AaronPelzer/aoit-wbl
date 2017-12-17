var express = require("express"),
    router = express();

router.get("/", function(req, res) {
    res.render("main/index", {
        title: "Index"
    });
});


router.get("/contact", function(req, res) {
    res.render("main/contact", {
        title: "Contact Us"
    });
});




module.exports = router;