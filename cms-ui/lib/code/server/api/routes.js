"use strict";

const express = require("express");
const proxy = require("../helpers/proxy");

let APIRouter = express.Router();

function addSessionAndProxy(req, res, method) {
    req.body.sessionInfo = {
        userId: req.session.user.id,
        sessionId: req.session.sessionId,
    };
    return proxy(req, res, method);
}

APIRouter.get("/users/current", function(req, res) {
    res.send(JSON.stringify(req.session.user));
});

APIRouter.get("*", function(req, res) {
    return addSessionAndProxy(req, res, "GET");
});

APIRouter.post("*", function(req, res) {
    return addSessionAndProxy(req, res, "POST");
});

APIRouter.put("*", function(req, res) {
    return addSessionAndProxy(req, res, "PUT");
});

APIRouter.delete("*", function(req, res) {
    return addSessionAndProxy(req, res, "DELETE");
});

module.exports = APIRouter;
