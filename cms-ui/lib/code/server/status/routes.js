"use strict";

const express = require("express");

let StatusRouter = express.Router();

StatusRouter.get("/status", function(req, res) {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify({
        status: "ok",
    }));
});

StatusRouter.get("/version", function(req, res) {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify({
        version: require("../../package.json").version,
    }));
});

module.exports = StatusRouter;
