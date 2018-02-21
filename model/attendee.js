const db = require("../lib/sqlite-wrapper.js")('./wbl', true),
      tableName = "attendee";

module.exports = class Attendee {
    constructor(attendee = {}){
        let model = {
            eventID: 0,
            profileID: 0
        }

        function setProperty(obj){
            for(var p in Object(model) ) {
                console.log( `${p} = ${obj}`);
                model[p] = obj[p];
            }
        }

        setProperty(attendee);
        this.model = model;
    }

    save(){
        db.insert(tableName, this.model, cb);
    }

    update(id, items){
        db.updateById(tableName, id, items, cb)
    }

    get(callback){
        db.list(tableName, cb);
    }

    getOne(id, cb){
        db.find(tableName, id, cb);
    }

    remove(id, cb){
        db.removeById(tableName, id, cb);
    }
}