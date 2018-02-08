const db = require("../lib/sqlite-wrapper.js")('./wbl', true),
      tableName = 'contact';

module.exports = class Contact {
    constructor(contact = {}, profileID){
        let model = {
            ID: 0,
            fName: "",
            lName: "",
            phone: "",
            cell: "",
            contactTypeID: 0,
            profileID: 0,
        }

        function setProperty(obj){
            for(var p in Object(model)){
                model[p] = obj[p];
            }
        }

        setProperty(contact);

        this.model = model;
        this.model.profileID = profileID;
    }

    save(cb){
        db.insert(tableName, this.model, cb);
    }

    update(id, items, cb){
        db.updateById(tableName, id, items, cb);
    }

    get(pID, cb){
        db.select(tableName, null, null, 'profileID=?', [pID], cb);
    }

    getOne(id, cb){
        db.selectOne(tableName, null, null, 'id=?', id, cb);
    }

    remove(id, cb){
        db.removeById(tableName, id, cb);
    }
}