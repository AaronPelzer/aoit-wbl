const db = require("../lib/sqlite-wrapper.js")('./wbl', true),
      Address = require('./address.js'),
      tableName = "school";

module.exports = class School { 
    constructor(school = {}, addressID, contactID){
        var model = {
            ID: 0,
            name: "",
            addressID: 0,
            contactID: 0
        };

        function setProperty(obj){
            for(var p in Object(model)){
                model[p] = obj[p];
            }
        }

        setProperty(school);

        this.model = model;
        this.model.addressID = addressID;
        this.model.contactID = contactID;
    }

    save(cb){
        let model = this.model;
        db.insert(tableName, model, (err, data) => {
            if(err){
                throw err;
            }
            cb();
        });
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

    remove(id, cb){
        db.removeById(tableName, id, (err) => {
            if(err){
                throw err;
            }
            cb();
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
    