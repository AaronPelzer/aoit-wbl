const db = require("../config/db"),
      util = require("../util/commands"),
      tableName = "Technical";

module.exports = class Technical {
    constructor(technical = {}){
        let model = {
            skill: "",
            profileID: 0
        }

        this.model = util.setProperty(model, technical);
    }

    save(cb){
        util.insert(tableName, this.model, cb);
    }

    get(pId, cb){
        db.query(`SELECT Technical.*, TechnicalAssessment.technicalSkillID, GROUP_CONCAT(TechnicalAssessment.grade Order By TechnicalAssessment.grade) As grades, Group_Concat(TechnicalAssessment.studentScore Order By TechnicalAssessment.grade) AS scores FROM Technical, TechnicalAssessment WHERE TechnicalAssessment.TechnicalSkillID=Technical.ID AND Technical.profileID=${pId} GROUP BY Technical.ID`, (err, data, fields) => {
            console.log(err, data);
            data.forEach((skill) => {
                console.log(skill);
                let grades = skill.grades.toString('utf8').split(',');
                let scores = skill.scores.toString('utf8').split(',');
                grades.forEach((grade, indx) => {
                    skill['grade_' +  grade] = scores[indx];
                });

                delete skill['grades'];
                delete skill['scores'];
            });
        
            cb(err, data, fields);
        });
    }

    getOne(id, cb){
        util.getOneById(tableName, id, cb);
    }

    getWithAssessment(profileID, cb){
        //Coming Soon
    }

    update(id, items, cb){
        util.updateById(tableName, id, items, cb);
    }

    remove(id, cb){
        util.removeById(tableName, id, cb);
    }
}

// SELECT Technical.*, TechnicalAssessment.professionalID, GROUP_CONCAT(TechnicalAssessment.grade Order By TechnicalAssessment.grade) As grades, Group_Concat(TechnicalAssessment.studentScore Order By TechnicalAssessment.grade) AS scores FROM Technical, TechnicalAssessment WHERE TechnicalAssessment.TechnicalID=Technical.ID AND Technical.profileID=15 GROUP BY Technical.ID