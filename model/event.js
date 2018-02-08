const db = require("../lib/sqlite-wrapper.js")('./wbl', true),
      tableName = "event";

module.exports = class Event {
    constructor(event = {}){
        var model = {
            name: "",
            date: "",
            location: "",
            eventType: 0
        }

        function setProperties(obj){
            for(var p in Object(model)){
                model[p] = obj[p];
            }
        }

        setProperties(event);
        this.model = model;
    }

    save(){
        db.insert(tableName, this.model, function(err){
            if(err){
                throw err;
            }
        });
    }

    update(id, items){
        db.updateById(tableName, id, items, (err) => {
            if(err){
                throw err;
            }
        })
    }

    get(callback){

        db.list(tableName, function(err, data){
            if(err){
                throw err;
            }
            callback(data);
        });
    }

    getOne(id, cb){
        db.find(tableName, id, function(err, data){
            if(err){
                throw err;
            }
            cb(data);
        });
    }

    remove(id, cb){
        db.removeById(tableName, id, cb);
    }
}