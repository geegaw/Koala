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
    return addSessionAndProxy(req, res, "get");
});

APIRouter.post("*", function(req, res) {
    return addSessionAndProxy(req, res, "post");
});

APIRouter.put("*", function(req, res) {
    return addSessionAndProxy(req, res, "put");
});

APIRouter.delete("*", function(req, res) {
    return addSessionAndProxy(req, res, "delete");
});

module.exports = APIRouter;
