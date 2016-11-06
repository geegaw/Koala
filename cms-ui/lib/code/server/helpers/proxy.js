"use strict";

const rp = require("request-promise");
const config = require("../../../../config");

function proxy(req, res, method) {
    let options = {
        method: method,
        uri: config.api.host + req.path,
        body: req.body,
        json: true
    };

    return rp.post(options).then(function () {
        res.sendStatus(200);
    }).catch(function (error) {
        console.error(error);
        res.sendStatus(403);
    });
}

module.exports = proxy;
