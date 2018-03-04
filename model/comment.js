const db = require("../config/db"),
      util = require('../util/commands'),
      tableName = 'Comment';

module.exports = class Comment {
    constructor(comment = {}){
        let model = {
            comment: ""
        }

        this.model = util.setProperty(model, comment);
    }

    save(cb){
        db.query(`INSERT INTO ${tableName} SET ?`, this.model, cb);
    }

    get(id, cb){
        db.query(`SELECT comment FROM ${tableName} WHERE ID='${id}'`, cb);
    }

    update(id, items, cb){
        db.query(`UPDATE ${tableName} SET ? WHERE ID='${id}'`, items, cb);
    }

    remove(id, cb){
        db.query(`DELETE FROM ${tableName} WHERE ID='${id}'`, cb);
    }
}
