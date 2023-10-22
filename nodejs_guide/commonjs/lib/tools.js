const date = require('./date.js');

const addFunc = (x, y) => {
    return x + y;
}

module.exports.add = function add(x, y) {   
    return x + y;
}

module.exports = (x, y) => {
    return x + y;
}

const div = (x, y) => {
    return x / y;
}

module.exports = { div: div, addFunc }

module.exports.minus = (x, y) => {
    return x - y;
}

module.exports.PI = 3.1415926;

module.exports.Koa = class Koa {
    constructor() {
        this.middleware = [];
    }
    use(fn) {
        this.middleware.push(fn);
    }
    listen() {
        console.log('listen');
    }
}

console.log(module);
console.log('----------------------------------------------------------------');