"use strict";

const express = require("express");
const Responses = require("../helpers/responses");

let StatusRouter = express.Router();

StatusRouter.get("/status", function(req, res){
    Responses.json(res, {
        status: "ok",
    });
});

StatusRouter.get("/version", function(req, res){
    Responses.json(res, {
        version: "ok",
    });
});



module.exports = StatusRouter;
