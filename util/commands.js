var commands = {
    setProperty: function(model, obj){
        for(var p in Object(model) ) {

            console.log( `${p} = ${obj}`);

            model[p] = obj[p];
        }
    },

    getValues: function(obj){
        let arr = [];
        for(var p in obj){
            arr.push(obj[p]);
        }
        return arr;
    }
}

module.exports = commands;
