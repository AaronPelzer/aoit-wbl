const db = require("../config/db"),
      util = require("../util/commands"),
      tableName = "certification";

module.exports = class Certification { 
    constructor(certification = {}, commentID, profileID){
        let model = {
            name: "",
            date: "",
            authority: "",
            score: "",
            profileID: 0,
            commentID: 0
        }

        this.model = util.setProperty(model, certification);
    }

    save(cb){
        db.query(`INSERT INTO ${tableName} SET ?`, this.model, cb);
    }

    get(pId, cb){
        db.query(`SELECT * FROM ${tableName} WHERE profileID='${pId}'`, cb);
    }

    getOne(id, cb){
        db.query(`SELECT * FROM ${tableName} WHERE ID='${id}' LIMIT 1`);
    }

    update(id, items, cb){
        db.query(`UPDATE ${tableName} SET ? WHERE ID='${id}'`, items, cb);
    }

    remove(id, cb){
        db.query(`DELETE FROM ${tableName} WHERE ID='${id}'`, cb);
    }

    select(id, columns, cb){
        db.query(`SELECT ? FROM ${tableName} WHERE ID='${id}'`, cb);
    }
}