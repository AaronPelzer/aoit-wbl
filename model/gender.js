const db = require("../lib/sqlite-wrapper.js")('./wbl', true),
      tableName = 'gender';

module.exports = class gender {
    constructor(genderType = {}){
        let model = {
            ID: 0,
            gender: ""
        }
    
        function setProperty(obj){
            for(var p in Object(model)){
                model[p] = obj[p];
            }
        }

        setProperty(genderType);
        this.model = model;
    }

    save(cb){
        db.insert(tableName, this.model, cb);
    }

    update(id, items){
        db.updateById(tableName, id, items, cb);
    }

    get(cb){
        db.list(tableName, cb);
    }

    getOneById(id, cb){
        db.selectOne(tableName, null, null, 'id=?', id, cb);
    }

    remove(id, cb){
        db.removeById(tableName, id, cb);
    }
}
