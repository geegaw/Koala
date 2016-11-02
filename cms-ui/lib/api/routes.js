"use strict";

const express = require("express");
const path = require("path");
const proxy = require("../helpers/proxy");

let APIRouter = express.Router();

function addSessionAndProxy(req, res, method) {
    req.body.sessionInfo = {
        userId: req.session.userId,
        sessionId: req.session.id,
    };
    return proxy(req, res, method);
}

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
