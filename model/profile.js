const db = require("../config/db"),
      util = require('../util/commands'),
      tableName = "Profile";

module.exports = class Profile {
    constructor(person = {}) {
        var model = {
            firstName: "",
            midName: "",
            lastName: "",
            dob: 0,
            genderID: 0,
            ethnicityID: 0,
            pathwayID: 0
        };
        
        this.model = util.setProperty(model, person);
    }

    save(cb){
        util.insert(tableName, this.model, cb); 
    }

    get(cb){
        util.list(tableName, cb);
    }

    getOne(id, cb){
        util.getOneById(tableName, id, cb);
    }

    update(id, items, cb){
        util.updateById(tableName, id, items, cb);
    }

    remove(id, cb){
        util.removeById(tableName, id, cb);
    }

    getAllStudents(query, cb) {
        query = query.query || '';
        db.query(`
            SELECT 
                p.ID, p.firstName, p.midName, p.lastName, p.dob, p.grade, e.ethnicity, h.type, path.pathway
            FROM Account AS a, ${tableName} AS p 
            LEFT JOIN Ethnicity AS e ON (e.ID=p.ethnicityID)
            LEFT JOIN Hispanic AS h ON (h.ID=p.hispanicID) 
            LEFT JOIN CTEPathway AS path ON (path.ID=p.pathwayID) 
            WHERE a.profileID=p.ID AND a.accountTypeID=5 AND (p.firstName LIKE '%${query}%' OR p.lastName LIKE '%${query}%' OR p.grade LIKE '%${query}%' OR path.pathway LIKE '%${query}%')
            ORDER BY p.lastName
        `, cb);
    }

    getOneWithInfo(id, cb) {
        db.query(`
            SELECT 
                p.ID, p.firstName, p.midName, p.lastName, p.dob, p.grade, e.ethnicity, h.type, path.pathway, g.gender
            FROM ${tableName} AS p 
            LEFT JOIN Ethnicity AS e ON (e.ID=p.ethnicityID)
            LEFT JOIN Hispanic AS h ON (h.ID=p.hispanicID) 
            LEFT JOIN CTEPathway AS path ON (path.ID=p.pathwayID)
            LEFT JOIN Gender AS g ON (g.ID=p.genderID) 
            WHERE p.ID=${id}
            Limit 1
        `, (err, data, fields) => {
            cb(err, data[0], fields);
        })
    }
};