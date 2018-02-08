const db = require("../lib/sqlite-wrapper.js")('./wbl', true),
      tableName = "accountType";

exports.module = class AccountType {
    constructor(accountType = {}){
        let model = {
            ID: 0,
            type: ""
        }

        function setProperty(obj){
            for(var p in Object(model)){
                model[p] = obj[p];
            }
        }

        setProperty(accountType);

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

    remove(id, cb){
        db.removeById(tableName, id, cb);
    }
}
