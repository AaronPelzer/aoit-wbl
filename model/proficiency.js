const db = require("../config/db"),
      util = require("../util/commands"),
      tableName = "proficiency";

module.exports = class Proficiency {
    constructor(proficiency = {}){
        let model = {
            ID: 0,
            desc: ""
        }

        this.model = util.setProperty(model, proficiency);
    }

    save(cb){
        db.query(`INSERT INTO ${tableName} SET ?`, this.model, cb)
    }

    get(cb){
        db.query(`SELECT * FROM ${tableName}`, cb);
    }

    getOne(id, cb){
        db.query(`SELECT * FROM ${tableName} WHERE ID='${id}' LIMIT 1`, cb);
    }

    update(id, items){
        db.query(`UPDATE ${tableName} SET ? WHERE ID='${id}'`, items, cb);
    }

    remove(id, db){
        db.query(`DELETE FROM ${tableName} WHERE ID='${id}'`, cb);
    }
}