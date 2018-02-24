const db = require("../config/db"),
      util = require('../util/commands'),
      tableName = "profile";

module.exports = class Profile {
    constructor(person = {}) {
        var model = {
            firstName: "",
            midName: "",
            lastName: "",
            dob: 0
        };
        
        this.model = util.setProperty(model, person);
    }

    save(cb){
        // db.query(`INSERT INTO ${tableName} SET ?`, this.model, cb);
        util.insert(tableName, this.model, cb); 
    }

    get(cb){
        db.query(`SELECT * FROM ${tableName}`, cb);
    }

    getOne(id, cb){
        db.query(`SELECT * FROM ${tableName} WHERE ID=${id} LIMIT 1`, (err, data) => {
            cb(err, data[0]);
        });
    }

    update(id, items, cb){
        db.query(`UPDATE ${tableName} SET ? WHERE ID=${id}`, items, cb)
    }

    remove(id, cb){
        db.query(`DELETE FROM ${tableName} WHERE ID=${id}`, cb);
    }
};