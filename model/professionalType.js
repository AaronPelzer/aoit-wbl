const db = require("../lib/sqlite-wrapper.js")('./wbl', true),
      tableName = 'professionalType';

module.exports = class ProfessionalType {
    constructor(professionalType = {}){
        var model = {
            ID: 0,
            skill: "",
            desc: ""
        }

        function setProperty(obj){
            for(var p in model){
                model[p] = obj[p];
            }
        }

        setProperty(professionalType);

        this.model = model;
    }

    save(cb){
        db.insert(tableName, this.model, cb);
    }

    update(id, items){
        db.updateById(tableName, id, items, cb);
    }

    get(cb){
        db.list(tableName, cb);
    }

    remove(id, cb){
        db.removeById(tableName, id, cb);
    }
}