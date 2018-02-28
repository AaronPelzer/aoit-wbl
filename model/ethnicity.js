const db = require("../config/db"),
      util = require("../util/commands"),
      tableName = 'Ethnicity';

    module.exports = class Ethnicity {
        constructor(race = {}){
            let model = {
                ethnicity: ""
            }

        this.model = util.setProperty(model, race);
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
}