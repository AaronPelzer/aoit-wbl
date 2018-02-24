const db = require("../config/db"),
      util = require("../util/commands"),
      tableName = "course";

module.exports = class Course { 
    constructor(course = {}){
        let model = {
            title: "",
            year: 0,
            hours: 0,
            termID: 0,
            commentID: 0,
            profileID: 0
        }

        this.model = util.setProperty(model, course);
    }

    save(cb){
        db.query(`INSERT INTO ${tableName} SET ?`, this.model, cb);
    }

    getCommentID(id, cb){
        db.query(`SELECT commentID FROM ${tableName} WHERE ID='${id}'`, cb);
    }

    get(pId, cb){
        db.query(`SELECT * FROM ${tableName} WHERE profileID='${pId}'`, cb);
    }

    getOne(id, cb){
        db.query(`SELECT * FROM ${tableName} LIMIT 1`, cb);
    }

    getWithComment(pId, cb){
        db.query(`SELECT * FROM ${tableName}, comment WHERE ${tableName}.profileID='${pId}' AND comment.ID=${tableName}.commentId`);
    }

    update(id, items, cb){
        db.query(`UPDATE ${tableName} SET ? WHERE ID='${id}'`, items, cb);
    }

    remove(id, cb){
        db.query(`DELETE FROM ${tableName} WHERE ID='${id}'`, cb);
    }
}