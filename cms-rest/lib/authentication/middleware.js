"use strict";

const _ = require("lodash");
const Responses = require("../helpers/responses");
const Session = require("../models/Session");
const User = require("../models/User");

function checkAuth(req, res, next) {

    if (!_.get(req, "body.sessionInfo.sessionId") || !_.get(req, "body.sessionInfo.userId")) {
        Responses.unauthorized(res);
    } else {
        let sessionInfo = req.body.sessionInfo;
        return Session.validate(sessionInfo.userId, sessionInfo.sessionId).then(function(valid) {
            if (valid) {
                let user = new User({
                    id: sessionInfo.userId
                });
                user.fetch().then(function() {
                    req.session.user = user;
                    next();
                }).catch(function(error) {
                    Responses.error(res, error);
                });

            } else {
                Responses.unauthorized(res);
            }
        }).catch(function(error) {
            Responses.error(res, error);
        });
    }
}

module.exports = checkAuth;
