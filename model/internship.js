const db = require("../config/db"),
      util = require("../util/commands"),
      tableName = 'Internship';

module.exports = class Internship {
    constructor(internship = {}){
        let model = {
            desc: "",
            date: "",
            length: 0,
            company: "",
            skillsLearned: "",
            profileID: 0
        }

        this.model = util.setProperty(model, internship);
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