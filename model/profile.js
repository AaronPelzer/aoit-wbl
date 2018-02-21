var db = require("../lib/sqlite-wrapper.js")('./wbl', true),
    tableName = "Profile";


module.exports = class Profile {

    constructor(person = {}) {

        var model = {
            ID: 0,
            firstName: "",
            midName: "",
            lastName: "",
            genderId: 0,
            genderOther: "",
            dob: 0
        };

        function setProperty(obj) {
            for (var p in Object(model)) {
                model[p] = obj[p];
            }
        }
        // if(Object.keys(profile).length){
        setProperty(person);
        //}
        this.model = model;
    }


    save() {
        db.insert(tableName, this.model, function(err) {
            if (err) {
                throw err;
            }
        });
    }

    update(id, items) {
        db.updateById(tableName, id, items, (err) => {
            if (err) {
                throw err;
            }
        })
    }

    get(callback) {

        db.list(tableName, function(err, data) {
            if (err) {
                throw err;
            }
            callback(data);
        });
    }

    getOne(id, cb) {
        db.selectOne(tableName, cb);
        /*
        db.find(tableName, id, function(err, data) {
            if (err) {
                throw err;
            }
            cb(data);
        });
        */
    }

    remove(id, cb) {
        db.removeById(tableName, id, cb);
    }
};