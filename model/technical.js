const db = require("../config/db"),
      util = require("../util/commands"),
      tableName = "technical";

module.exports = class Technical {
    constructor(technical = {}, assessmentID, profileID){
        let model = {
            skill: "",
            profileID: 0
        }

        this.model = util.setProperty(technical);
    }

    save(cb){
        db.query(`INSERT INTO ${tableName} SET ?`, this.model, cb);
    }

    get(profileId, cb){
        db.query(`SELECT * FROM ${tableName} WHERE profileID='${profileId}'`);
    }

    getOne(id, cb){
        db.query(`SELECT * FROM ${tableName} WHERE ID='${id}' LIMIT 1`, cb);
    }

    getWithAssessment(profileID, cb){
        //Coming Soon
    }

    update(id, items, cb){
        db.query(`UPDATE ${tableName} SET ? WHERE ID='${id}'`, items, cb);
    }

    remove(id, cb){
        db.query(`DELETE FROM ${tableName} WHERE ID='${id}'`, cb);
    }
}