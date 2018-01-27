const db = require('../lib/sqlite-wrapper'),
      tableName = "proficiency";

module.exports = class Proficiency {
    constructor(proficiency = {}){
        let model = {
            ID: 0,
            level: 0,
            desc: ""
        }

        function setProperty(obj){
            for(var p in Object(model)){
                model[p] = obj[p];
            }
        }

        setProperty(proficiency);

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
        })
    }

    get(cb){
        db.list(tableName, (err, data) => {
            if(err){
                throw err;
            }
            cb(data);
        })
    }

    remove(db){
        db.removeById(tableName, id, cb)
    }
}