"use strict";

const express = require("express");
const path = require("path");
const rp = require("request-promise");
const config = require("../../../../config");

let AuthenticationRouter = express.Router();

AuthenticationRouter.get("*", function(req, res) {
    if (req.session.userId) {
        res.redirect("/home");
    } else {
        res.sendFile(path.resolve(__dirname + "/../../../templates/login.html"));
    }
});

AuthenticationRouter.post("*", function(req, res) {
    let options = {
        method: "POST",
        uri: config.api.host + "/login",
        body: req.body,
        json: true
    };

    return rp.post(options).then(function(result) {
        req.session.userId = result.userId;
        req.session.sessionId = result.sessionId;
        res.sendStatus(200);
    }).catch(function (error) {
        console.error(error.toString());
        res.sendStatus(403);
    });
});

module.exports = AuthenticationRouter;
