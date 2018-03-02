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
        if(Object.keys(query.length === 0)){
            db.query(`SELECT ${tableName}.* FROM ${tableName}, Account WHERE Account.profileID=${tableName}.ID AND Account.accountTypeID=5`, cb);
        } else {
            db.query(`SELECT ${tableName}.* FROM ${tableName}, Account WHERE Account.profileID=${tableName}.ID AND Account.accountTypeID=5 AND ?`, query, cb);
        }
    }
};