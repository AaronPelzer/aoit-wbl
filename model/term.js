const db = require('../lib/sqlite-wrapper'),
      tableName = "term";

module.exports = class Term {
    constructor(term = {}){
        let model = {
            ID: 0,
            name: 0
        }

        function setProperty(obj){
            for(var p in Object(model)){
                model[p] = obj[p];
            }
        }

        setProperty(course);

        this.model = model;
    }

    save(cb){
        db.insert(tableName, this.model, cb);
    }

    update(id, items){
        db.updateById(tableName, id, items, (err) => {
            if(err){
                throw err;
            }
        });
    }

    get(cb){
        db.list(tableName, cb);
    }

    remove(id, cb){
        db.removeById(tableName, id, cb);
    }
}