"use strict";

const rp = require("request-promise");
const config = require("../../../../config");

function proxy(req, res, method) {

    let options = {
        method: method,
        uri: config.api.host + req.path,
        body: Object.assign({}, req.body, req.query),
        json: true
    };

    return rp[method](options).then(function(result) {
        res.send(JSON.stringify(result));
    }).catch(function (error) {
        console.error(error);
        res.sendStatus(500);
    });
}

module.exports = proxy;
