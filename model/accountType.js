const db = require("../config/db"),
      util = require("../util/commands"),
      tableName = "AccountType";

exports.module = class AccountType {
    constructor(accountType = {}){
        let model = {
            type: ""
        }

        this.model = util.setProperty(model, accountType);
    }

    save(cb){
        util.insert(tableName, this.model, cb);
    }

    update(id, items, cb){FROM
        util.updateById(tableName, id, items, cb);
    }

    get(cb){
        util.list(tableName, cb);
    }

    remove(id, cb){
        util.removeById(tableName, id, cb);
    }
}
