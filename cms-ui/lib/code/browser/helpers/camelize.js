"use strict";

function camelize(str) {
    if (!str.length) {
        return str;
    }
    return str.replace(/^[^a-zA-Z]*([a-zA-Z]{1})/, function(match, p1) {
        return p1;
    }).replace(/[^a-zA-Z]{1}([a-zA-Z]{1})/g, function(match, p1, index) {
        return index === 0 ? p1 : p1.toUpperCase();
    }).replace(/[^a-zA-Z0-9]/g, "");
}

module.exports = camelize;
