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

    exists(techID, grade, cb){
        db.query(`SELECT * FROM ${tableName} WHERE technicalSkillID='${techID}' AND grade='${grade}' LIMIT 1`, (err, data) => {
            if(data.length === 0){
                cb(false, null);
            } else {
                cb(true, data[0].ID);
            }
        });
    }

    update(id, items, cb){
        db.query(`UPDATE ${tableName} SET ? WHERE ID='${id}'`, items, cb);
    }

    remove(id, cb){
        db.query(`DELETE FROM ${tableName} WHERE ID='${id}'`, cb);
    }
}