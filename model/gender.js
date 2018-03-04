const db = require("../config/db"),
      util = require('../util/commands'),
      tableName = 'Gender';

module.exports = class Gender {
    constructor(genderType = {}){
        let model = {
            gender: ""
        }

        this.model = util.setProperty(model, genderType);
    }

    save(cb){
        util.insert(tableName, this.model, cb);
    }

    get(cb){
        util.list(tableName, cb);
    }

    getOne(id, cb){
        util.getOneById(tableName, id, cb);
    }

    update(id, items, cb){
        util.updateById(tableName, id, items, cb);
    }

    remove(id, cb){
        util.removeById(tableName, id, cb);
    }
};

