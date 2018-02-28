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
        util.insert(tableName, this.model, cb);
    }

    get(pId, cb){
        db.query(`SELECT Technical.*, TechnicalAssessment.technicalSkillID, GROUP_CONCAT(TechnicalAssessment.grade Order By TechnicalAssessment.grade) As grades, Group_Concat(TechnicalAssessment.studentScore Order By TechnicalAssessment.grade) AS scores FROM Technical, TechnicalAssessment WHERE TechnicalAssessment.TechnicalSkillID=Technical.ID AND Technical.profileID=${pId} GROUP BY Technical.ID`, cb);
    }

    getOne(id, cb){
        util.getOneById(tableName, id, cb);
    }

    getWithAssessment(profileID, cb){
        //Coming Soon
    }

    update(id, items, cb){
        util.updateById(id, items, cb);
    }

    remove(id, cb){
        util.removeById(id, cb);
    }
}