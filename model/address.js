const util = require('../util/commands'),
      tableName = "Address";

module.exports = class Address {
    constructor(address = {}){
        var model = {
            ID: 0,
            address: "",
            city: "",
            state: "",
            zip: ""
        }

        this.model = util.setProperty(model, address);
    }

    save(cb){
        util.insert(tableName, this.model, cb);
    }

    update(id, items){
        util.updateById(tableName, id, items, cb);
    }
    
    get(cb){
        util.list(tableName, cb);
    }

    getOne(id, cb){
        util.getOneById(tableName, id, cb);
    }

    remove(id, cb){
        util.removeById(tableName, id, cb);
    }
}
