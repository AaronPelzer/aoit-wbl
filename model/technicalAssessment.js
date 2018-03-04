const db = require('../config/db'),
      util = require('../util/commands'),
      tableName = 'TechnicalAssessment';

module.exports = class technicalAssessment {
    constructor(technicalAssessment = {}){
        let model = {
            studentScore: 0,
            grade: 0,
            technicalSkillID: 0
        }

        this.model = util.setProperty(model, technicalAssessment);
    }

    save(cb){
        db.query(`INSERT INTO ${tableName} SET ?`, this.model, cb);
    }

    get(techID, cb){
        db.query(`SELECT * FROM ${tableName} WHERE technicalSkillID='${techID}'`, cb);
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