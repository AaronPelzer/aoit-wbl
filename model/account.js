var db = require("../lib/sqlite-wrapper.js")('./wbl', true),
    Profile = require("./profile.js");

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
        db.updateById("account", id, obj, (err) => {
            if(err){
                console.log(err);
            }
        })
    }

    remove(id){
        db.removeById("account", this.model.id, (err) => {
            if(err){
                throw(err);
            }
        })
    }

    get(callback){

        db.list("Account", function(err, data){
            if(err){
                throw err;
            }

            callback(data);
        });
    }

    getOne(arr, cb){
        db.selectOne('account', null, null, 'email=? AND password=?', arr, (err, data) => {
            if(err) {
                throw err;
            }
            cb(data);
        })
    }
};
