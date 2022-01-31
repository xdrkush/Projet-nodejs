const moment = require('moment-timezone');
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
    ifCond: function(a, b, opts) {
        if (a == b) {
            return opts.fn(this);
        } else {
            return opts.inverse(this);
        }
    },
    formatDate: function(datetime, format) {
        if (moment) {
            moment.updateLocale('fr', frLocal);
           var time1 = moment(datetime).tz("Europe/Paris").format(format)
           return time1
        }
        else {
          return datetime;
        }
      },
    formatDateCom: function(datetime, format) {
        if (moment) {
            moment.updateLocale('fr', frLocal);
           var time2 = moment(datetime).fromNow()
           return time2
        }
        else {
          return datetime;
        }
      },
    maskNom: function(nom){
        nom.split(' ')
        return `${nom[0].toUpperCase()}.`
    }

}