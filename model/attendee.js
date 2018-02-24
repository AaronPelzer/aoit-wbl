const db = require('../config/db'),
      util = require('../util/commands'),
      tableName = "attendee";

module.exports = class Attendee {
    constructor(attendee = {}){
        let model = {
            eventID: 0,
            profileID: 0
        }

        this.model = util.setProperty(model, attendee);
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
        util.updateById(tableName, id, cb);
    }

    remove(id, cb){
        util.removeById(tableName, id, cb);
    }
}