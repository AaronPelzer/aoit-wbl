var db = require("../lib/sqlite-wrapper.js")('./wbl', true),
    Profile = require("./profile.js"),
    util = require("../util/commands");



module.exports = class Account {
    constructor(account = {}, profile = {}){

    constructor(account, profile){
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

    save(){
        // STORE IN PRIVATE VALUE BEFORE CHANGE IN CALLBACK
        var m = this.model;
        console.log("HERE");
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
            });
        });
    }

    update(obj){
        let whereClause = "";
        let len = Object.keys(obj).length;
        let i = 0;
        for(var key in obj){
            whereClause += `${key}=?`;
            i++;
            if(i < len){
                whereClause += " AND ";
            }
        }
        db.update("account", whereClause, util.getValues(obj), this.model, (err) => {
            if(err){
                console.log("----------------");
                console.log(err);
            }
        })
    }

    remove(){
        db.remove("account", "osis=?", this.model.osis, (err) => {
            if(err){
                console.log("-------------------");
                console.log(err);
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
};
