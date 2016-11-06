"use strict";

const _ = require("lodash");

function checkAuth(req, res, next){
    if (!_.get(req, "session.userId")) {
        res.redirect("/login");
    } else {
        next();
    }
}

module.exports = checkAuth;
