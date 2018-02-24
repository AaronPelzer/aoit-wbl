const db = require('../config/db'),
      util = require('../util/commands'),
      tableName = 'term';

module.exports = class Term {
    constructor(term = {}){
        let model = {
            term: ""
        }

        this.model = util.setProperty(model, course);
    }

    save(cb){
        db.query(`INSERT INTO ${tableName} SET ?`, this.model, cb);
    }

    get(cb){
        db.query(`SELECT * FROM ${tableName}`, cb);
    }

    update(id, items, cb){
        db.query(`UPDATE ${tableName} SET ? WHERE ID='${id}'`, items, cb);
    }

    remove(id, cb){
        db.query(`DELETE FROM ${tableName} WHERE ID='${id}'`, cb);
    }
}