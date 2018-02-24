const db = require('../config/db');

var commands = {
    setProperty: function(model, obj){
        for(var p in Object(model) ) {
            model[p] = obj[p];
        }
        return model;
    },

    getValues: function(obj){
        let arr = [];
        for(var p in obj){
            arr.push(obj[p]);
        }
        return arr;
    },

    genCode: () => {
        return Math.floor(Math.random() * 899) + 100;
    },

    //DATABASE COMMANDS
    insert: (table, items, cb) => {
        db.query(`INSERT INTO ${table} SET ?`, items, cb);
    },

    list: (table, cb) => {
        db.query(`SELECT * FROM ${table}'`, cb);
    },

    getOne: (table, where, whereVal, cb) => {
        db.query(`SELECT * FROM ${table} WHERE ${where}='${whereVal}' LIMIT 1`, (err, data, fields) => {
            cb(err, data[0], fields);
        });
    },

    update: (table, where, whereVal, items, cb) => {
        db.query(`UPDATE ${table} SET ? WHERE ${where}='${whereVal}'`, items, cb);
    },

    updateById: (table, id, items, cb) => {
        db.query(`UPDATE ${table} SET ? WHERE ID='${id}'`, items, cb);
    },

    remove: (table, where, whereVal, cb) => {
        db.query(`DELETE FROM ${table} WHERE ${where}='${whereVal}'`, cb);
    },

    removeById: (table, id, cb) => {
        db.query(`DELETE FROM ${table} WHERE ID='${id}'`, cb);
    },

    select: (table, id, columns, where, whereVal, cb) => {
        db.query(`SELECT ? FROM ${table} WHERE ${where}='${whereVal}'`, columns, cb);
    },

    selectOne: (table, id, columns, where, whereVal, cb) => {
        db.query(`SELECT ? FROM ${table} WHERE ${where}='${whereVal}' LIMIT 1`, columns, (err, data, fields) => {
            cb(err, data[0], fields);
        });
    }
}

module.exports = commands;