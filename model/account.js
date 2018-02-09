const db = require("../lib/sqlite-wrapper.js")('./wbl', true),
      Profile = require("./profile.js"),
      tableName = "account",
      bcrypt = require("bcryptjs");

module.exports = class Account {
    
    constructor(account = {}, profileID){
        var model = {
            ID: 0,
            osis: "",
            email: "",
            password: "",
            dateCreated: "",
            profileID: 0,
            accountTypeId: 0,
            lastLogin: "",
            lastUpdated: ""
        };

        function setProperty(obj){
            for(var p in Object(model) ) {
                console.log( `${p} = ${obj}`);
                model[p] = obj[p];
            }
        }

        setProperty(account);

        this.model = model;
        this.model.profileID = profileID;
    }

    save(cb){
        db.insert(tableName, this.model, function(err){
            console.log("Model");
            console.log(this);
            console.log("BREAK");
            cb(err);
        });
    }

    update(id, items, cb){
        db.updateById(tableName, id, items, cb);
    }

    remove(id){
        db.removeById(tableName, id, cb);
    }

    get(cb){

        db.list(tableName, cb);
    }

    // GENERIC VERSION
    getOne(where, vals, cb){
        db.selectOne(tableName, null, null, where, vals, cb);
    }

    getAccountById(id, cb){
        db.selectOne(tableName, null, null, 'id=?', id, cb);
    }
    getAccountByEmail(email, cb){
        db.selectOne(tableName, null, null, 'email=?', email, cb);
    }
    
    comparePassword(userPassword, hash, cb){
        bcrypt.compare(userPassword, hash, function(err, isMatch) {
            if(err) throw err;
            cb(null, isMatch);
        });
    }
};
