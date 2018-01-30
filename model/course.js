const db = require("../lib/sqlite-wrapper.js")('./wbl', true),
      tableName = "course";

module.exports = class Course { 
    constructor(course = {}, commentID, profileID){
        let model = {
            ID: 0,
            title: "",
            year: 0,
            hours: 0,
            profileID: 0,
            termID: 0,
            commentID: 0
        }

        function setProperty(obj){
            for(var p in Object(model)){
                model[p] = obj[p];
            }
        }

        setProperty(course);

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

    remove(id, cb){
        db.removeById(tableName, id, cb);
    }

    select(id, columns, cb){
        db.select(tableName, null, columns, 'ID=?', [id], cb);
    }
}