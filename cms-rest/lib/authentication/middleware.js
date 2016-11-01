"use strict";

const _ = require("lodash");
const Responses = require("../helpers/responses");

function checkAuth(req, res, next){
    if (!_.get(req, "session.userId")) {
        Responses.unauthorized(res);
    } else {
        next();
    }
}

module.exports = checkAuth;
