var db = require('../lib/sqlite-wrapper.js')('./wbl', true),
    tableName = "address";

module.exports = class Address {
    constructor(address = {}){
        var model = {
            ID: 0,
            address: "",
            address2: "",
            city: "",
            state: "",
            zip: ""
        }
        
        function setProperty(obj){
            for(var p in Object(model)){
                model[p] = obj[p];
            }
        }

        setProperty(address);

        this.model = model;
    }

    save(cb){
        db.insert(tableName, this.model, (err) => {
            if(err){
                throw err;
            }
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
