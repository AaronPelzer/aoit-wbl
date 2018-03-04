const db = require("../config/db"),
      util = require("../util/commands"),
      tableName = 'Professional';

module.exports = class Professional {
    constructor(professional = {}){
        let model = {
            professionalTypeID:0,
            profileID: 0
        }

        this.model = util.setProperty(model, professional);
    }

    save(cb){
        db.query(`INSERT INTO ${tableName} SET ?`, this.model, cb);
    }

    get(pId, cb){
        db.query(`SELECT * FROM ${tableName} WHERE profileID='${pId}'`, cb);
    }

    getOne(id, cb){
        db.query(`SELECT * FROM ${tableName} WHERE id='${id}'`, cb);
    }

    update(id, items){
        db.query(`UPDATE ${tableName} SET ? WHERE ID='${id}'`, items, cb);
    }

    remove(id, cb){
        db.query(`DELETE FROM ${tableName} WHERE ID='${id}'`, cb);
    }
}