const db = require("../config/db"),
      util = require("../util/commands"),
      tableName = "accountType";

exports.module = class AccountType {
    constructor(accountType = {}){
        let model = {
            type: ""
        }

        this.model = util.setProperty(model, accountType);
    }

    save(cb){
        db.query(`SELECT * FROM ${tableName} SET ?`, this.model, cb);
    }

    update(id, items, cb){FROM
        db.query(`UPDATE ${tableName} SET ? WHERE ID='${id}'`, items, cb);
    }

    get(cb){
        db.query(`SELECT * FROM ${tableName}`, cb);
    }

    remove(id, cb){
        db.query(`DELETE FROM ${tableName} WHERE ID='${id}'`. items, cb);
    }
}
