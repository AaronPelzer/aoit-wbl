var db = require("../lib/sqlite-wrapper.js")('./wbl', true),
    Address = require('./address.js'),
    tableName = "school";

module.exports = class School { 
    constructor(school = {}, address = {}){
        var model = {
            ID: 0,
            name: "",
            addressId: 0
        };

        function setProperty(obj){
            for(var p in Object(model)){
                model[p] = obj[p];
            }
        }

        setProperty(school);

        this.model = model;
        this.address = address;
    }

    save(cb){
        var m = this.model;

        db.insert("address", this.address, function(err){
            if(err) {
                throw err;
            }

            console.log("Address inserted ID " + this.lastID);

            m.addressId = this.lastID;

            db.insert(tableName, m, (err) => {
                if(err){
                    throw err;
                }
                console.log("School inserted ID " + this.lastID);
                cb({status:1});
            })

        })
    }

    update(id, items, cb){
        db.updateById(tableName, id, items, (err, data) => {
            if(err){
                throw err;
            }
            cb(data);
        });
    }
}
    