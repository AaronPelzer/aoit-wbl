const mysql = require('mysql'),
    settings = require('./settings.json');

let db;

function connect(){
    if(!db){
        db = mysql.createConnection(settings);

        db.connect(function(err){
            if(err) console.log(err);
            else console.log("Connection Successful!");
        });
    }
    return db;
}

module.exports = connect();