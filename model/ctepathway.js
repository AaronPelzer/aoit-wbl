const util = require("../util/commands"),
      tableName = 'CTEPathway';

module.exports = class CTEPathway {
    constructor(pathway = {}){
        let model = {
            pathway: ""
        }

        this.model = util.setProperty(model, pathway);
    }

    save(cb) {
        util.insert(tableName, this.model, cb);
    }

    get(cb){
        util.list(tableName, cb);
    }

    getOne(id, cb){
        util.getOneById(tableName, id, cb);
    }

    update(id, items, cb){
        util.updateById(tableName, id, items, cb);
    }

    remove(id, cb){
        util.removeById(tableName, id, cb);
    }
}