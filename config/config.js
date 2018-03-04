let config = {};

let db = {
    dev: {
        "host": "localhost",
        "user": "test",
        "password": "secret",
        "database": "wbl"
    },
    prod: {
        "host": "mysql1008.ixwebhosting.com",
        "port": 3306,
        "user": "C4394_aoit",
        "password": "aoitAOIT999!",
        "database": "C4394_aoit",
        "insecureAuth": true
    }
}

if(process.env.NODE_ENV == 'prod'){
    config.db = db.prod;
} else {
    config.db = db.dev;
}

config.secret = "Ilikesleeping";

module.exports = config;