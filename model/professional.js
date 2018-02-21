const db = require("../lib/sqlite-wrapper.js")('./wbl', true),
      tableName = 'professional';

module.exports = class Professional {
    constructor(professional = {}, assessmentID, profileID){
        let model = {
            ID: 0,
            professionalTypeID:0,
            assessmentID: 0,
            profileID: 0
        }

        function setProperty(obj){
            for(var p in Object(model)){
                model[p] = obj[p];
            }
        }

        setProperty(professional);

        this.model = model;
        this.model.profileID = profileID;
        this.assessment = assessment;
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