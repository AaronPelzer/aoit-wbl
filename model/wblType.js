const db = require("../lib/sqlite-wrapper.js")('./wbl', true),
      tableName = "wblType";

module.exports = class wblType {
    constructor(wblType = {}){
        let model = {
            ID: 0,
            type: ""
        }

        function setProperty(obj){
            for(var p in model){
                model[p] = obj[p];
            }
        }

        setProperty(model);

        this.model = model;
    }

    save(cb){
        db.insert(tableName, this.model, (err) => {
            if(err){
                throw err;
            }
            cb();
        })
    }

    update(id, items){
        db.updateById(tableName, id, items, (err) => {
            if(err){
                throw err;
            }
        });
    }

    remove(id, cb){
        db.removeById(tableName, id, cb);
    }
}