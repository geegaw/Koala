"use strict";

const express = require("express");
const path = require("path");
const proxy = require("../helpers/proxy");

let AuthenticationRouter = express.Router();

AuthenticationRouter.get("*", function(req, res) {
    res.sendFile(path.resolve(__dirname + "/../../../templates/login.html"));
});

AuthenticationRouter.post("*", function(req, res) {
    return proxy(req, res, "POST").then(function(resp){
        req.session.userId = resp.userId;
        req.session.sessionId = resp.sessionId;
    });
});

module.exports = AuthenticationRouter;
