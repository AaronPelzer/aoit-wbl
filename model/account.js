const db = require("../config/db"),
      Profile = require("./profile.js"),
      bcrypt = require("bcryptjs"),
      tableName = "Account",
      util = require('../util/commands');

module.exports = class Account {
    
    constructor(account = {}){
        var model = {
            OSIS: "",
            email: "",
            dateCreated: "",
            lastLogin: "",
            lastUpdate: "",
            profileID: 0,
            accountTypeID: 0,
            lastLogin: "",
            lastUpdate: ""
        };

        this.model = util.setProperty(model, account);
    }

    save(cb){
        bcrypt.genSalt(10, (err, salt) => {
            let rand = util.genCode(),
                pass = `${this.model.osis}${rand}`;

            bcrypt.hash(pass, salt, (err, hash) => {
                this.model.password = hash;
                db.query(`INSERT INTO ${tableName} SET ?`, this.model, (err, data) => {
                    cb(err, data, rand);
                });
            });
        });
    }

    update(id, items, cb){
        util.updateById(tableName,id, items, cb);
    }

    remove(id, cb){
        util.removeById(tableName, id, cb);
    }

    get(cb){
        util.list(tableName, cb);
    }

    getAccountById(id, cb){
        util.getOneById(tableName, id, cb);
    }

    getAccountByEmail(email, cb){
        util.getOne(tableName, 'email', email, cb);
    }

    setAccountHold(data, cb){
        util.insert('Verified', data, cb);
    }

    comparePassword(userPassword, hash, cb){
        bcrypt.compare(userPassword, hash, (err, isMatch) => {
            if(err) throw err;
            cb(null, isMatch);
        });
    }

    setAccountHold(data, cb) {
        util.insert("Verification", data, cb);
    }

    verifyAccount(link, cb) {
        util.selectOne("Verification", null, 'link', link, (err, row) => {
            if(err) console.error(err);
            console.log(link, row);
            if(link === row.link){
                util.updateById(tableName, row.accountID, {
                    verified: 1
                }, err => {
                    util.remove("Verification", 'accountID', row.accountID, cb);
                });
            }
        });
    }
};