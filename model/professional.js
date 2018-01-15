const db = require('../lib/sqlite-wrapper'),
      tableName = 'professional';

module.expors = class Professional {
    constructor(professional = {}, profileID){
        let model = {
            ID: 0,
            professionalTypeID:0,
            profileID: 0,
            grade: 0,
            selfEval: 0,
            teachEval: 0
        }

        function setProperty(obj){
            for(var p in Object(model)){
                model[p] = obj[p];
            }
        }

        setProperty(professional);

        this.model = model;
        this.model.profileID = profileID;
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
        })
    }

    remove(id, cb){
        db.removeById(tableName, id, cb);
    }
}