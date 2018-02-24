const db = require("../config/db"),
      util = require('../util/commands'),
      tableName = 'gender';

module.exports = class gender {
    constructor(genderType = {}){
        let model = {
            gender: ""
        }

        this.model = util.setProperty(model, genderType);
    }

    save(cb){
        db.query(`INSERT INTO ${tableName} SET ?`, this.model, cb);
    }

    get(cb){
        db.query(`SELECT * FROM ${tableName}`, cb);
    }

    getOne(id, cb){
        db.query(`SELECT * FROM ${tableName} WHERE ID='${id} LIMIT 1'`, cb);
    }

    update(id, items, cb){
        db.query(`UPDATE ${tableName} SET ? WHERE ID='${id}'`, items, cb);
    }

    remove(id, cb){
        db.query(`DELETE FROM ${tableName} WHERE ID='${id}'`, cb);
    }
}
