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
    }
}