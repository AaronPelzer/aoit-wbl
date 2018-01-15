var db = require("../lib/sqlite-wrapper.js")('./wbl', true),
    Address = require('./address.js'),
    tableName = "school";

module.exports = class School { 
    constructor(school = {}, address = {}){
        var model = {
            ID: 0,
            name: "",
            addressId: 0,
            contactId: 0
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

    selectOne(columns, where, val, cb){
        db.selectOne(tableName, null, columns, `${where}=?`, [val], (err, data) => {
            if(err){
                throw err;
            }
            cb(data);
        })
    }

    update(id, items, cb){
        db.updateById(tableName, id, items, (err) => {
            if(err){
                throw err;
            }
            cb();
        });
    }

    remove(id){
        db.removeById(tableName, id, (err) => {
            if(err){
                throw err;
            }
        })
    }

    get(cb){
        db.list(tableName, (err, data) => {
            if(err){
                throw err;
            }

            cb(data);
        });
    }

    getOne(id, cb){
        db.find(tableName, id, (err, data) => {
            if(err){
                throw err;
            }
            cb(data);
        })
    }
}
    