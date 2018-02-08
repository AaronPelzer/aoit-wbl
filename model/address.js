const db = require('../lib/sqlite-wrapper.js')('./wbl', true),
    tableName = "address";

module.exports = class Address {
    constructor(address = {}){
        var model = {
            ID: 0,
            address: "",
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
        console.log(this.model);
    }

    save(cb){
        let model = this.model;
        db.insert(tableName, model, (err) => {
            if(err){
                throw err;
            }
            db.getMax(tableName, cb);
        });
    }

    update(id, items){
        db.updateById(tableName, id, items, cb);
    }
    
    get(cb){
        db.list(tableName, cb)
    }

    getOne(id, cb){
        db.find(tableName, id, cb);
    }

    remove(id, cb){
        db.removeById(tableName, id, cb);
    }
}
