const db = require("../lib/sqlite-wrapper.js")('./wbl', true),
    Profile = require("./profile.js"),
    tableName = "account",
    bcrypt = require("bcryptjs");

module.exports = class Account {

    constructor(account = {}, profileID) {

        var model = {
            ID: 0,
            osis: "",
            email: "",
            password: "",
            dateCreated: "",
            profileID: 0,
            accountTypeID: 0,
            lastLogin: "",
            lastUpdate: ""
        };

        function setProperty(obj) {
            for (var p in Object(model)) {
                // console.log(`${p} = ${obj}`);
                model[p] = obj[p];
            }
        }

        setProperty(account);

        this.model = model;
        this.model.profileID = profileID;

        // console.log("ID: " + this.model.ID);
    }

    save(cb) {
        var m = this.model;

        db.insert("account", m, function(err, results) {
            if (err) {
                throw err;
            }

            cb(err, results);
        });
    }

    update(id, obj) {
        db.updateById(tableName, id, obj, (err) => {
            if (err) {
                console.log(err);
            }
        })
    }

    remove(id) {
        db.removeById(tableName, id, (err) => {
            if (err) {
                throw (err);
            }
        })
    }

    get(cb) {

        db.list(tableName, cb);
    }

    // GENERIC VERSION
    getOne(where, vals, cb) {
        db.selectOne(tableName, null, null, where, vals, cb);
    }

    getAccountById(id, cb) {
        db.selectOne(tableName, null, null, 'id=?', id, cb);
    }
    getAccountByEmail(email, cb) {
        db.selectOne(tableName, null, null, 'email=?', email, cb);
    }

    comparePassword(userPassword, hash, cb) {
        bcrypt.compare(userPassword, hash, function(err, isMatch) {
            if (err) throw err;
            cb(null, isMatch);
        });
    }

    setAccountHold(data, cb) {
        db.insert("verification", data, cb);
    }

    verifyAccount(obj, col, data, cb) {
        db.selectOne("verification", null, obj, col, data, function(err, row) {
            if (err) console.error(err);

            if (data[0] === row.link) {

                db.update(tableName, "ID = ?", [row.accountID], { verified: 1 }, function(err) {
                    db.remove("verification", 'accountID=?', [row.accountID], cb);
                });
            }
            console.log(row);
        });
    }
};