var Storage = function(id, type) {
    var s = window[type + "Storage"];

    var model = {
        profile: {},
        courses: {},
        professional: {},
        technical: {},
        wbLearning: {},
        certifications: {},
        calculations: {}
    };

    if (s.length < 1) {
        s.setItem(id, JSON.stringify(model));
    }

    function getID() {
        return Object.keys(s)[0];
    }

    function getRecord() {
        return s[Object.keys(s)];
    }

    function save(data) {
        s.setItem(getID(), JSON.stringify(data));
    }

    return {
        add: function(k, v) {
            var r = this.get();
            r[k] = v;

            save(r);
        },
        get: function(k) {
            var v = JSON.parse(getRecord());

            if (typeof k === "undefined") {
                return v;
            } else {
                return v[k];
            }
        },
        debug: function() {
            return s;
        }
    }
}

var s = new Storage(123, "session");