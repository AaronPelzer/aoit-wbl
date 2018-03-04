const db = require("../config/cb"),
      util = require("../util/commands"),
      tableName = "Event";

module.exports = class Event {
    constructor(event = {}){
        var model = {
            name: "",
            date: "",
            location: "",
            eventType: 0
        }

        this.model = util.setProperties(event);
    }

    save(cb){
        db.query(`INSERT INTO ${tableName} SET ?`, this.model, cb);
    }

    get(cb){
        db.query(`SELECT * FROM ${tableName}`, cb);
    }

    getOne(id, cb){
        db.query(`SELECT * FROM ${tableName} WHERE ID='${id}' LIMIT 1`, cb);
    }

    update(id, items, cb){
        db.query(`UPDATE ${tableName} SET ? WHERE ID='${id}'`, items, cb);
    }

    remove(id, cb){
        db.query(`DELETE FROM ${tableName} WHERE ID='${id}'`, cb);
    }
}