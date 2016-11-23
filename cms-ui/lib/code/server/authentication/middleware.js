"use strict";

const _ = require("lodash");
const rp = require("request-promise");

const config = require("../../../../config");

function checkAuth(req, res, next) {
    if (!_.get(req, "session.user.id")) {
        if (_.get(req, "cookies.userId") && _.get(req, "cookies.sessionId")) {
            authenticate(req).then(next).catch(function() {
                res.redirect("/login");
            });
        } else {
            res.redirect("/login");
        }
    } else {
        next();
    }
}

function authenticate(req) {
    let options = {
        uri: config.api.host + "/model/user/" + req.cookies.userId,
        body: {
            sessionInfo: {
                userId: req.cookies.userId,
                sessionId: req.cookies.sessionId,
            },
        },
        json: true
    };

    return rp.get(options).then(function(user) {
        req.session.sessionId = req.cookies.sessionId;
        req.session.user = user;
    });
}

module.exports = checkAuth;
