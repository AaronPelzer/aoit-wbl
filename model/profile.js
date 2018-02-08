const db = require("../lib/sqlite-wrapper.js")('./wbl', true),
      tableName = "profile";

var sqlite = require('sqlite3').verbose();

module.exports = class Profile {

    constructor(person = {}) {

        var model = {
            ID: 0,
            fName: "",
            mName: "",
            lName: "",
            genderId: 0,
            dob: 0
        };

        function setProperty(obj){
            for(var p in Object(model) ) {
                model[p] = obj[p];
            }
        } 
        
        setProperty(person);
        this.model = model;
    }


    save(cb){
        db.insert(tableName, this.model, (err) => {
            if(err) throw err;
            db.getMax(tableName, cb);
        });
    }

    update(id, items, cb){
        console.log('reached');
        db.updateById(tableName, id, items, cb)
    }

    get(cb){
        db.list(tableName, cb);
    }

    getOne(id, cb){
        db.select(tableName, null, null, 'profile.ID=?', [id], cb);
    }

    remove(id, cb){
        db.removeById(tableName, id, cb);
    }
};