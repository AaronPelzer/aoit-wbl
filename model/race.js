const db = require("../lib/sqlite-wrapper.js")('./wbl', true),
    tableName = 'race';

module.exports = class Race {
    constructor(race = {}) {
        let model = {
            ID: 0,
            race: ""
        }

        function setProperty(obj) {
            for (var p in Object(model)) {
                model[p] = obj[p];
            }
        }

        setProperty(race);
        this.model = model;
    }

    save(cb) {
        db.insert(tableName, this.model, cb);
    }

    update(id, items) {
        db.updateById(tableName, id, items, cb);
    }

    get(cb) {
        db.list(tableName, cb);
    }

    getOneById(id, cb) {
        db.selectOne(tableName, null, null, 'id=?', id, cb);
    }

    remove(id, cb) {
        db.removeById(tableName, id, cb);
    }
}