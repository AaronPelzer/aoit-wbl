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
        db.query(`SELECT Professional.*, ProfessionalSkill.skill 
        FROM ProfessionalSkill, Professional
        LEFT JOIN (
        
        SELECT ProfessionalAssessment.professionalID, GROUP_CONCAT( ProfessionalAssessment.grade
        ORDER BY ProfessionalAssessment.grade ) AS grades, GROUP_CONCAT( ProfessionalAssessment.studentScore
        ORDER BY ProfessionalAssessment.grade ) AS scores, ProfessionalSkill.skill
        FROM Professional, ProfessionalAssessment, ProfessionalSkill
        WHERE ProfessionalAssessment.ProfessionalID = Professional.ID

        GROUP BY Professional.ID
        ) AS a on (Professional.ID=a.professionalID)
        WHERE Professional.profileID =15`, (err, data, fields) => {
            console.log(err, data);
            data.forEach((skill) => {
                if(skill.grades != null){
                    let grades = skill.grades.toString('utf8').split(',');
                    let scores = skill.scores.toString('utf8').split(',');
                    grades.forEach((grade, indx) => {
                        skill['grade_' +  grade] = scores[indx];
                    });

                    delete skill['grades'];
                    delete skill['scores'];
                }
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