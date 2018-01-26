const db = require('../lib/sqlite-wrapper'),
    tableName = 'contact';

module.exports = class Contact {
    constructor(contact = {}, schoolID){
        let model = {
            ID: 0,
            schoolID: 0,
            type: "",
            desc: ""
        }

        function setProperty(obj){
            for(var p in Object(model)){
                model[p] = obj[p];
            }
        }

        setProperty(contact);

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
            cb();
        });
    }

    get(schoolID, cb){
        db.select(tableName, null, null, 'schoolID=?', [schoolId], (err, data) => {
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