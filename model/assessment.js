const db = require('../lib/sqlite-wrapper.js')('./wbl', true),
    tableName = 'assessment';

module.exports = class Assessment {
    constructor(assessment = {}){
        let model = {
            ID: 0,
            selfEval: 0,
            grade: 0
        }

        function setProperties(obj){
            for(var p in Object(model)){
                model[p] = obj[p];
            }
        }

        setProperties(assessment);
        this.model = model;
    }

    save(cb){
        db.insert(tableName, this.model, (err) => {
            if(err){
                throw err;
            }
            db.getMax(tableName, cb);
        });
    }

    update(id, items, cb){
        db.updateById(tableName, id, items, cb);
    }
    
    get(cb){
        db.list(tableName, cb);
    }

    getOne(id, cb){
        db.find(tableName, id, cb);
    }

    remove(id, cb){
        db.removeById(tableName, id, cb);
    }
}