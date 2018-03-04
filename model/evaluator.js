const db = require("../config/db"),
      util = require("../util/commands"),
      tableName = "Evaluator";

module.exports = class Evaluator {
    constructor(evaluator = {}){
        var model = {
            ID: 0,
            fName: "",
            lName: "",
            title: "",
            grade: 0,
            commentID: 0,
            profileID: 0
        }

        this.model = util.setProperty(model, evaluator);
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