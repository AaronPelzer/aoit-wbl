const db = require("../config/db"),
      Profile = require("./profile.js"),
      bcrypt = require("bcryptjs"),
      tableName = "account",
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
            accountTypeId: 0,
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
        db.query(`UPDATE ${tableName} SET ? WHERE ID='${id}'`, items, cb);
    }

    remove(id, cb){
        db.query(`DELETE FROM ${tableName} WHERE ID='${id}'`, cb);
    }

    get(cb){
        db.query(`SELECT * FROM ${tableName}`);
    }

    getAccountById(id, cb){
        db.query(`SELECT * FROM ${tableName} WHERE ID='${id}' LIMIT 1`, (err, data) => {
            cb(err, data[0]);
        });
    }

    getAccountByEmail(email, cb){
        db.query(`SELECT * FROM ${tableName} WHERE email='${email}' LIMIT 1`, (err, data) => {
            cb(err, data[0]);
        });
    }

    setAccountHold(data, cb){
        db.query('INSERT INTO verification SET ?', data, cb);
    }

    comparePassword(userPassword, hash, cb){
        bcrypt.compare(userPassword, hash, (err, isMatch) => {
            if(err) throw err;
            cb(null, isMatch);
        });
    }

    verifyAccount(token, cb){
        // db.selectOne("verification", null, obj, col, data, function(err, row){
        //     if(err) console.error(err);

        //     if(data[0] === row.link){

        //         db.update(tableName, "ID = ?" , [row.accountID], { verified: 1 }, function(err) {
        //             db.remove("verification", 'accountID=?', [row.accountID], cb);
        //         });
        //     }
        //     console.log(row);
        // });
        db.query(`SELECT * FROM verification WHERE link=${token}`, cb);
    }
};
