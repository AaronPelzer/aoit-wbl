const db = require("../lib/sqlite-wrapper.js")('./wbl', true),
      tableName = 'comment';

module.exports = class Comment {
    constructor(comment = {}){
        let model = {
            ID: 0,
            comment: ""
        }
    
        function setProperty(obj){
            for(var p in Object(model)){
                model[p] = obj[p];
            }
        }

        setProperty(comment);
        this.model = model;
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

    update(id, items, cb){
        db.updateById(tableName, id, items, cb);
    }

    get(profileId, cb){
        db.list(tableName, cb);
    }

    getOne(id, cb){
        db.selectOne(tableName, null, null, 'id=?', id, cb);
    }

    remove(id, cb){
        db.removeById(tableName, id, cb);
    }
}
