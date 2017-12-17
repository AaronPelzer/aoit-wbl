var sqlite = require('sqlite3').verbose(),
    db;

// './data'
function Database(dbName) {
    db = new sqlite.Database(dbName);

    function execute(query, params, callback) {
        db.prepare(query).all(params, callback);
    }

    function executeOne(query, params, callback) {
        db.prepare(query).run(params, callback);
    }

    return {
        select: function(query, params, callback) {
            execute(query, params, function(err, data) {
                if (err) {
                    console.error(err);
                }
                callback(data);
            });
        },
        selectOne: function(query, params, callback) {

        },
        insert: function(query, params) {

        },
        update: function(query, params, callback) {

        },
        debug: function() {

        }
    }
}


// var database = new Database("./data");

module.exports = new Database("./data");;