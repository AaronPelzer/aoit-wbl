const db = require("../lib/sqlite-wrapper.js")('./wbl', true),
      tableName = "schoolContact";

module.exports = class schoolContact {
    constructor(contact = {}){
        var model = {
            ID: 0,
            phone: "",
            fax: ""
        }
        
        function setProperty(obj){
            for(var p in Object(model)){
                model[p] = obj[p];
            }
        }

        setProperty(contact);
        this.model = model;
    }

    save(cb){
        let model = this.model;
        db.insert(tableName, model, (err) => {
            if(err){
                throw err;
            }
            db.getMax(tableName, (err, data) => {
                if(err){
                    throw err;
                }
                cb(data['MAX(ID)']);
            })
        });
    }

    update(id, items){
        db.updateById(tableName, id, items, (err) => {
            if(err){
                throw err;
            }
        });
    }
    
    get(cb){
        db.list(tableName, (err, data) => {
            if(err){
                throw err;
            }
            cb(data);
        })
    }

    getOne(id, cb){
        db.find(tableName, id, (err, data) => {
            if(err){
                throw err;
            }
            cb(data);
        });
    }

    remove(id, cb){
        db.removeById(tableName, id, cb);
    }
}
