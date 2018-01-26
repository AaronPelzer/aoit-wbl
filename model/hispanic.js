const db = require('../lib/sqlite-wrapper'),
      tableName = 'hispanic';

module.exports = class Hispanic {
    constructor(hispanic = {}, profileId){
        let model = {
            ID: 0,
            profileId: 0,
            selected: 0
        }

        function setProperty(obj){
            for(var p in Object(model)){
                model[p] = obj[p];
            }
        }

        setProperty(hispanic);

        this.model = model;
        this.model.profileId = profileId;
    }

    save(cb){
        db.insert(tableName, this.model, (err) => {
            if(err){
                throw err;
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