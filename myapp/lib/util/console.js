var color = require('colors');

var config = {
    notice: 'green',
    error: 'red',
    show: 'rainbow',
    bat: 'blue',
    debug: 'gray'
};

var type = {
    'string': function(msg, rule) {
        return msg[rule];
    },
    'number': function(msg, rule) {
        return ('' + msg)[rule];
    },
    'object': function(msg, rule) {
        return JSON.stringify(msg)[rule];
    },
    'function': function(msg, rule) {
        return msg.toString()[rule];
    },
    'boolean': function(msg, rule) {
        return ('' + msg)[rule];
    },
    'undefined': function(msg, rule) {
        return ('' + msg)[rule];
    }
}

function _Console() {
    this.log = function(msg){
        console.log('[log]:', msg);
    }
}


for (var item in config) {
    (function(item) {
        _Console.prototype[item] = function(msg) {
            console.log(('[' + item + ']:')[config[item]], type[typeof msg](msg, config[item]));
        }
    })(item);
}

module.exports = new _Console();
