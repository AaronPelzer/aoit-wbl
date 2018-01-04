//var Connection = require("connection.js");


module.exports = class Profile {

    constructor(person) {

        var model = {
            ID: 0,
            firstName: "",
            midName: "",
            lastName: "",
            genderId: 0,
            genderOther: "",
            dob: 0
        };

        function setProperty(obj){
            for(var p in Object(model) ) {
    
                //console.log( `${p} = ${obj}`);
    
                model[p] = obj[p];
            }
        }

        setProperty(person);

        this.model = model;
    }

    
};