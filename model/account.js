var db = require("../lib/sqlite-wrapper.js")('./wbl', true),
    Profile = require("./profile.js");



module.exports =  class Account {
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

        setProperty(account);

        this.model = model;
        this.profile = profile;
    }

    save(){
        // STORE IN PRIVATE VALUE BEFORE CHANGE IN CALLBACK 
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
            });
        });
        
        /*
        db.insert("profile", {
            firstName: p.model.firstName,
            midName: p.model.mI,
            lastName: p.model.lastName,
            genderId: p.model.genderId,
            genderOther: p.model.genderOther,
            dob: p.model.dob
        }, function(err){
            if(err){
                throw err;
            }
            console.log("Profile Inserted ID " + this.lastID);
            p.model.ID = this.lastID;

            db.insert("account", {
                osis: 12312321,
                email: "user@aoit.org",
                password: "somepasswordthatishash",
                dateCreated: d.getDate(),
                profileID: p.model.ID,
                accountTypeId: 1,
                lastLogin: "",
                lastUpdate: ""
            }, function(){
                if(err){
                    throw err;
                }
                console.log("Account Inserted ID " + this.lastID);
                p.model.ID = this.lastID;
            });
        });
        */
    }
};

/*
function(){

    var tableName = "account";

    var account = {
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

    return {
        add: function(obj){

            let p = new Profile({
                firstName: "Aaron",
                mI: "M",
                lastName: "Pelzer",
                genderId: 2,
                dob: "10/10/2017"
            });

            var d = new Date();
            
            
            db.insert("profile", {
                firstName: p.model.firstName,
                midName: p.model.mI,
                lastName: p.model.lastName,
                genderId: p.model.genderId,
                genderOther: p.model.genderOther,
                dob: p.model.dob
            }, function(err){
                if(err){
                    throw err;
                }
                console.log("Profile Inserted ID " + this.lastID);
                p.model.ID = this.lastID;

                db.insert("account", {
                    osis: 12312321,
                    email: "user@aoit.org",
                    password: "somepasswordthatishash",
                    dateCreated: d.getDate(),
                    profileID: p.model.ID,
                    accountTypeId: 1,
                    lastLogin: "",
                    lastUpdate: ""
                }, function(){
                    if(err){
                        throw err;
                    }
                    console.log("Account Inserted ID " + this.lastID);
                    p.model.ID = this.lastID;
                });
            });



            //db.insert()
            /*
            db.insert(tableName, {
                osis: 1111,
                email: "someStudent@aoit.edu",
                password: 1231231,
                dateCreated: d.getDate(),
                accountTypeId: 1
            }, function(err){
                if(err){
                    throw err;
                }
                console.log("Inserted ID " + this.lastID);
            });
            /
        }
    };
}
*/