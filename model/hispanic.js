const db = require("../config/db"),
      util = require("../util/commands")
      tableName = 'hispanic';

module.exports = class Hispanic {
    constructor(hispanic = {}){
        let model = {
            selected: 0,
            profileID: 0
        }

        this.model = util.setProperty(model, hispanic);
    }

    save(cb){
        db.query(`INSERT INTO ${tableName} SET ?`, this.model, cb);
    }

    get(pId, cb){
        db.query(`SELECT * FROM ${tableName} WHERE profileID='${pId}'`, cb);
    }

    update(id, items, cb){
        db.query(`UPDATE ${tableName} SET ? WHERE ID='${id}'`, items, cb);
    }

    remove(id, cb){
        db.query(`DELETE FROM ${tableName} WHERE ID='${id}'`, cb);
    }
}