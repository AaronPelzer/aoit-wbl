const db = require("../lib/sqlite-wrapper.js")('./wbl', true),
      tableName = "certification";

module.exports = class Certification { 
    constructor(certification = {}, commentID, profileID){
        let model = {
            ID: 0,
            name: "",
            date: "",
            authority: "",
            score: "",
            profileID: 0,
            commentID: 0
        }

        function setProperty(obj){
            for(var p in Object(model)){
                model[p] = obj[p];
            }
        }

        setProperty(certification);

        this.model = model;
        this.model.profileID = profileID;
        this.model.commentID = commentID;
    }

    save(cb){
        db.insert(tableName, this.model, cb);
    }

    update(id, items, cb){
        db.updateById(tableName, id, items, cb);
    }

    get(profileId, cb){
        db.select(tableName, null, null, 'profileID=?', [profileId], cb);
    }

    getOne(id, cb){
        db.selectOne(tableName, null, null, 'id=?', [id], cb);
    }

    remove(id, cb){
        db.removeById(tableName, id, cb);
    }

    select(id, columns, cb){
        db.select(tableName, null, columns, 'ID=?', [id], cb);
    }
}