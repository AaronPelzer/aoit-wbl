const db = require("../config/db"),
      util = require("../util/commands"),
      tableName = 'School';

module.exports = class School { 
    constructor(school = {}){
        var model = {
            ID: 0,
            name: "",
            addressID: 0,
            contactID: 0
        };

        function setProperty(obj){
            for(var p in Object(model)){
                model[p] = obj[p];
            }
        }

        this.model = util.setProperty(model, school);
    }

    save(cb){
        db.query(`INSERT INTO ${tableName} SET ?`, this.model, cb);
    }

    get(cb){
        db.query(`SELECT * FROM ${tableName}`, cb);
    }

    getOne(id, cb){
        db.query(`SELECT * FROM ${tableName} WHERE ID='${id}' LIMIT 1`);
    }

    update(id, items, cb){
        db.query(`UPDATE ${tableName} SET ? WHERE ID='${id}'`, items, cb);
    }

    remove(id, cb){
        db.query(`DELETE FROM ${tableName} WHERE ID='${id}'`, cb);
    }

    select(id, columns, cb){
        db.query(`SELECT ? FROM ${tableName} WHERE ID='${id}'`, cb);
    }
}
    