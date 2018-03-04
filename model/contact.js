const db = require("../config/db"),
      util = require("../util/commands"),
      tableName = 'Contact';

module.exports = class Contact {
    constructor(contact = {}, profileID){
        let model = {
            fName: "",
            lName: "",
            phone: "",
            cell: "",
            contactTypeID: 0,
            profileID: 0,
        }

        this.model = util.setProperty(model, contact);
    }

    save(cb){
        db.query(`INSERT INTO ${tableName} SET ?`, this.model, cb);
    }

    get(pID, cb){
        db.query(`SELECT * FROM ${tableName} WHERE profileID='${pId}'`, cb);
    }

    getOne(id, cb){
        db.query(`SELECT * FROM ${tableName} WHERE ID='${id}' LIMIT 1`, cb);
    }

    update(id, items, cb){
        db.query(`UPDATE ${tableName} SET ? WHERE ID='${id}'`, items, cb);
    }

    remove(id, cb){
        db.query(`DELETE FROM ${tableName} WHERE ID='${id}'`, cb);
    }
}