const db = require("../config/db"),
      util = require("../util/commands"),
      tableName = "Course";

module.exports = class Course { 
    constructor(course = {}){
        let model = {
            title: "",
            year: 0,
            hours: 0,
            termID: 0,
            profileID: 0
        }

        this.model = util.setProperty(model, course);
    }

    save(cb){
        util.insert(tableName, this.model, cb);
    }

    getCommentID(id, cb){
        util.selectOne(tableName, 'commentID', 'ID', id, cb);
    }

    get(pId, cb){
        db.query(`SELECT Course.*, Term.term FROM Course INNER JOIN Term ON Course.termID=Term.ID WHERE Course.profileID="${pId}";
        `, cb);
    }

    getOne(id, cb){
        util.getOneById(tableName, id, cb);
    }

    getWithComment(pId, cb){
        db.query(`SELECT * FROM ${tableName}, comment WHERE ${tableName}.profileID='${pId}' AND comment.ID=${tableName}.commentId`);
    }

    update(id, items, cb){
        util.updateById(tableName, id, items, cb);
    }

    remove(id, cb){
        util.removeById(tableName, id, cb);
    }
}