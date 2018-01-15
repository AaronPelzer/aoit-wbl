"use strict";

const express = require("express"),
    app = express(),
    port = process.env.port || 8081,
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    methodOverride = require('method-override'),
    session = require('express-session'),
    csrf = require("csurf"),
    expressValidator = require("express-validator"),
    flash = require("connect-flash"),
    passport = require("passport"),
    LocalStrategy = require("passport-local").Strategy;

app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ 'extended': 'true' }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vdn.api+json' }));
app.use(cookieParser());


app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);


app.use(session({
    secret: 'franklinklaneaoit',
    resave: true,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());



app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var   namespace = param.split('.'),
              root      = namespace.shift(),
              formParam = root;
 
      while(namespace.length) {
        formParam += '[' + namespace.shift() + ']';
      }
      return {
        param : formParam,
        msg   : msg,
        value : value
      };
    }
  }));

  app.use(flash());

  app.use(function(req, res, next){
      res.locals.success_msg = req.flash("success_msg");
      res.locals.error_msg = req.flash("error_msg");
      res.locals.error = req.flash("error");
      res.locals.user = req.user || null;
      next();
  });

// ROUTES
const route = "./controller/";

app.use('/', require(route + 'index.js'));
app.use('/Account', require(route + 'account.js'));
app.use('/Administrator', require(route + 'admin.js'));
app.use('/Student', require(route + 'student.js'));

//EVALUATOR
app.use("/Evaluator", function(req, res) {

});

// DEBUGGING
/*
app.use("/Test", function(req, res) {
    var Engine = require("./model/connection.js");


    Engine.select("SELECT * FROM race", [], (results) => {
        console.log(results);

    });

    res.render("test", {
        title: "Script Test"
    });
});


// SAMPLE CODE FOR SSC PROJECT
// SSC HOST
// REMOVED ON NEXT UPDATE
app.use("/SSC/profile", function(req, res) {
    res.render("SSC/profile", {
        title: "SSC Student Profile"
    });
});

app.use("/SSC/evaluation", function(req, res) {
    res.render("SSC/evaluation", {
        title: "Self Evaluation"
    });
});
*/

app.listen(port, function() {
    console.log("Server started on " + port);
});
