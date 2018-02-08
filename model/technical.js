const db = require("../lib/sqlite-wrapper.js")('./wbl', true),
      tableName = "technical";

module.exports = class Technical {
    constructor(technical = {}, assessmentID, profileID){
        let model = {
            ID: 0,
            skill: "",
            profileID: 0,
            assessmentID: 0
        }

        function setProperty(obj){
            for(var p in Object(model)){
                model[p] = obj[p];
            }
        }

        setProperty(technical);

        this.model = model;
        this.model.profileID = profileID;
        this.model.assessmentID = assessmentID;
    }

    save(cb){
        db.insert(tableName, this.model, cb);
    }

    update(id, items){
        db.updateById(tableName, id, items, cb);
    }

    get(profileId, cb){
        db.select(tableName, null, null, 'profileID=?', [profileId], cb)
    }

    remove(id, cb){
        db.removeById(tableName, id, cb);
    }
}