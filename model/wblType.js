const db = require("../config/db"),
      util = require("../util/commands"),
      tableName = "wblType";

module.exports = class wblType {
    constructor(wblType = {}){
        let model = {
            type: ""
        }

        this.model = util.setProperty(model);
    }

    save(cb){
        db.query(`INSERT INTO ${tableName} SET ? `, this.model, cb);
    }

    get(cb){
        db.query(`SELECT * FROM ${tableName}`, cb);
    }

    getOne(id, cb){
        db.query(`SELECT * FROM ${tableName} WHERE ID='${id}'`, cb);
    }

    update(id, items){
        db.query(`UPDATE ${tableName} SET ? WHERE ID='${id}'`, items, cb);
    }

    remove(id, cb){
        db.query(`DELETE FROM ${tableName} WHERE ID='${id}'`, cb);
    }
}