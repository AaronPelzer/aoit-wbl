const db = require("../lib/sqlite-wrapper.js")('./wbl', true),
      tableName = "wblActivity";

module.exports = class WBLActivity {
    constructor(wblActivity = {}, profileID){
        var model = {
            date: "",
            organization: "",
            hours: 0,
            commentID: 0,
            profileID: 0,
            wblTypeId: 0,
        }

        function setProperty(obj){
            for(var p in Object(model)){
                model[p] = obj[p];
            }
        }

        setProperty(model);

        this.model = model;
        this.model.profileID = profileID;
    }

    save(cb){
        db.insert(tableName, this.model, (err) => {
            if(err){
                console.log(err);
            }
            cb();
        });
    }

    update(id, items){
        db.updateById(tableName, id, items, (err) => {
            if(err){
                throw err;
            }
        });
    }

    get(profileId, cb){
        db.select(tableName, null, null, 'profileID=?', [profileId], (err, data) => {
            if(err){
                throw err;
            }
            cb(data);
        });
    }

    remove(id, cb){
        db.removeById(tableName, id, cb);
    }
}