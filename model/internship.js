const db = require("../lib/sqlite-wrapper.js")('./wbl', true),
      tableName = 'internship';

module.exports = class Internship {
    constructor(internship = {}, profileID){
        let model = {
            desc: "",
            date: "",
            length: 0,
            company: "",
            skillsLearned: "",
            profileID: 0
        }

        function setProperty(obj){
            for(var p in Object(model) ) {
                model[p] = obj[p];
            }
        }

        setProperty(internship);
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