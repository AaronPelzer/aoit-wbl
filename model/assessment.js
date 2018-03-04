const util = require('../util/commands'),
      tableName = 'Assessment';

module.exports = class Assessment {
    constructor(assessment = {}){
        let model = {
            ID: 0,
            selfEval: 0,
            grade: 0
        }

        this.model = util.setProperties(model, assessment);
    }

    save(cb){
        util.insert(tableName, this.model, cb);
    }

    update(id, items, cb){
        util.updateById(tableName, id, items, cb);
    }
    
    get(cb){
        util.list(tableName, cb);
    }

    getOne(id, cb){
        util.getOneById(tableName, id, cb);
    }

    remove(id, cb){
        util.removeById(tableName, id, cb);
    }
}