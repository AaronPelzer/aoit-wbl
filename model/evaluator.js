const db = require('../lib/sqlite-wrapper'),
      tableName = "evaluator";

module.exports = class Evaluator {
    constructor(evaluator = {}, profileID){
        var model = {
            ID: 0,
            firstName: "",
            lastName: "",
            title: "",
            grade: 0,
            comment: "",
            profileID: 0
        }

        function setProperty(obj){
            for(var p in Object(model)){
                model[p] = obj[p]
            }
        }

        setProperty(model);

        this.model = model;
        this.model.profileID = profileID;
    }

    save(cb){
        db.insert(tableName, this.model, (err) => {
            if(err){
                throw err;
            }
            cb(data);
        })
    }

    get(profileId, cb){
        db.select(tableName, null, null, 'profileID=?', [profileId], (err, data) => {
            if(err){
                console.log(err);
            }
            cb(data);
        })
    }

    remove(id, cb){
        db.removeById(tableName, id, cb);
    }
}