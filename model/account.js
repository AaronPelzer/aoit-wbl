var db = require("../lib/sqlite-wrapper.js")('./wbl', true),
    Profile = require("./profile.js"),
    tableName = "account",
    bcrypt = require("bcryptjs");

module.exports = class Account {
    
    constructor(account = {}, profile = {}){
        var model = {
            ID: 0,
            osis: "",
            email: "",
            password: "",
            dateCreated: "",
            profileID: 0,
            accountTypeId: 0,
            lastLogin: "",
            lastUpdate: ""
        };

        function setProperty(obj){
            for(var p in Object(model) ) {
                console.log( `${p} = ${obj}`);
                model[p] = obj[p];
            }
        }

        //if(Object.keys(account).length > 0 && Object.keys(profile).length ){
            setProperty(account);
        //}

        this.model = model;
        this.profile = profile;
    }

    save(cb){
        var m = this.model;

        db.insert("profile", this.profile, function(err){
            if(err){
                throw err;
            }

            console.log("Profile Inserted ID " + this.lastID);

            m.profileID = this.lastID;

            db.insert("account", m, function(err){
                if(err){
                    throw err;
                }
                console.log("Account Inserted ID " + this.lastID);
                cb({status: 1});
            });
        });
    }

    update(id, obj){
        db.updateById(tableName, id, obj, (err) => {
            if(err){
                console.log(err);
            }
        })
    }

    remove(id){
        db.removeById(tableName, id, (err) => {
            if(err){
                throw(err);
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
