const moment = require('moment');
const frLocal = require('moment/locale/fr')

module.exports = {
    condIff: (a, operator, b, opts) => {
        var bool = false;
        switch (operator) {
            case '==':
                bool = a == b;
                break;
            case '>':
                bool = a > b;
                break;
            case '<':
                bool = a < b;
                break;
            default:
                throw "Unknown operator " + operator;
        }

        if (bool) {
            return opts.fn(this);
        } else {
            return opts.inverse(this);
        }
    },
    incUp: (value, options) => {
        return parseInt(value) + 1;
    },
    incDown: (value, options) => {
        return parseInt(value) - 1;
    },
    limite: function (ar, max){
        var db = ar.slice(0,max);
        return db;
    },
    iffpage: function(a, b, opts) {
        if (a == b) {
            return opts.fn(this);
        } else {
            return opts.inverse(this);
        }
    },
    formatDate: function(datetime, format) {
        if (moment) {
            moment.updateLocale('fr', frLocal);
           var ds= moment(datetime).format("DD MMMM YYYY à HH:MM");
           return ds
        }
        else {
          return datetime;
        }
      }
}