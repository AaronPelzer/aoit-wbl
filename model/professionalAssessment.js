const db = require('../config/db'),
      util = require('../util/commands'),
      tableName = 'ProfessionalAssessment';

module.exports = class professionalAssessment {
    constructor(professionalAssessment = {}){
        let model = {
            studentScore: 0,
            grade: 0,
            professionalID: 0
        }

        this.model = util.setProperty(model, professionalAssessment);
    }

    save(cb){
        db.query(`INSERT INTO ${tableName} SET ?`, this.model, cb);
    }

    get(proID, cb){
        db.query(`SELECT * FROM ${tableName} WHERE professionalID='${proID}'`, cb);
    }

    getOne(id, cb){
        db.query(`SELECT * FROM ${tableName} WHERE ID='${id}' LIMIT 1`, cb);
    }

    exists(proID, grade, cb){
        db.query(`SELECT * FROM ${tableName} WHERE professionalID='${proID}' AND grade='${grade}' LIMIT 1`, (err, data) => {
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
        db.query(`DELETE FROM ${tableName} WHERE ID='${id}'`);
    }
}