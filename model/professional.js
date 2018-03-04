const db = require("../config/db"),
      util = require("../util/commands"),
      tableName = 'Professional';

module.exports = class Professional {
    constructor(professional = {}){
        let model = {
            professionalSkillID:0,
            profileID: 0
        }

        this.model = util.setProperty(model, professional);
    }

    save(cb){
        util.insert(tableName, this.model, cb);
    }

    get(pId, cb){
        db.query(`SELECT Professional.*, ProfessionalAssessment.professionalID, GROUP_CONCAT(ProfessionalAssessment.grade Order By ProfessionalAssessment.grade) As grades, Group_Concat(ProfessionalAssessment.studentScore Order By ProfessionalAssessment.grade) AS scores FROM Professional, ProfessionalAssessment WHERE ProfessionalAssessment.ProfessionalID=Professional.ID AND Professional.profileID=${pId} GROUP BY Professional.ID`, (err, data, fields) => {
            console.log(err, data);
            data.forEach((skill) => {
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