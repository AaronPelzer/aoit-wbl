const db = require("../config/db"),
      bcrypt = require("bcryptjs"),
      tableName = "Admin",
      util = require('../util/commands');

module.exports = class Account {
    
    constructor(account = {}){
        var model = {
            osis: "",
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

            let pass = this.model.osis;

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

    comparePassword(userPassword, hash, cb){
        bcrypt.compare(userPassword, hash, (err, isMatch) => {
            if(err) throw err;
            cb(null, isMatch);
        });
    }

    
};