const db = require("../lib/sqlite-wrapper.js")('./wbl', true),
      tableName = "wblActivity";

module.exports = class WBLActivity {
    constructor(wblActivity = {}, commentID, profileID){
        var model = {
            date: "",
            organization: "",
            hours: 0,
            wblTypeID: 0,
        }

        function setProperty(obj){
            for(var p in Object(model)){
                model[p] = obj[p];
            }
        }

        setProperty(wblActivity);
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

    select(id, columns, cb){
        db.select(tableName, null, columns, 'ID=?', [id], cb);
    }

    remove(id, cb){
        db.removeById(tableName, id, cb);
    }
}