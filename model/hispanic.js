const db = require("../lib/sqlite-wrapper.js")('./wbl', true),
      tableName = 'hispanic';

module.exports = class Hispanic {
    constructor(hispanic = {}){
        let model = {
            ID: 0,
            selected: 0
        }

        function setProperty(obj){
            for(var p in Object(model)){
                model[p] = obj[p];
            }
        }

        setProperty(hispanic);

        this.model = model;
        this.model.profileId = profileId;
    }

    save(cb){
        db.insert(tableName, this.model, (err) => {
            if(err){
                throw err;
            }
            cb();
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
        db.list(tableName, function(err, data){
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