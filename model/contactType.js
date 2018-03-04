const db = require("../config/db"),
      util = require("../util/commands"),
      tableName = 'ContactType';

module.exports = class ContactType {
    constructor(contactType = {}){
        let model = {
            type: ""
        }

        this.model = util.setProperty(model, contactType);
    }

    save(cb){
        db.query(`INSERT INTO ${tableName} SET ? `, this.model, cb);
    }

    get(cb){
        db.query(`SELECT * FROM ${tableName}`)
    }

    getOne(id, cb){
        db.query(`SELECT * FROM ${tableName} WHERE ID='${id}' LIMIT 1`, cb);
    }

    update(id, items, cb){
        db.query(`UPDATE ${tableName} SET ? WHERE ID='${id}'`, items, cb);
    }

    remove(id, cb){
        db.query(`DELETE FROM ${tableName} WHERE ID='${id}'`, cb);
    }
}
