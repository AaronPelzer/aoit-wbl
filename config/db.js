const mysql = require('mysql'),
    settings = require('./config').db;

let db;

function connect(){
    if(!db){
        db = mysql.createConnection(settings);

        db.connect(function(err){
            if(err) console.log(err);
            else console.log(`Connection to ${settings.host} successful!`);
        });
    }
    return db;
}

module.exports = connect();