"use strict";

const _ = require("lodash");

function checkAuth(req, res, next) {
    if (!_.get(req, "session.user.id")) {
        res.redirect("/login");
    } else {
        next();
    }
}

module.exports = checkAuth;
