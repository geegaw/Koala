"use strict";

const express = require("express");
const Responses = require("../helpers/responses");

let KoalaUIRouter = express.Router();

KoalaUIRouter.get("/login", function(req, res){

});

StatusRouter.get("/version", function(req, res){
    Responses.json(res, {
        version: require("../../package.json").version,
    });
});



module.exports = KoalaUIRouter;
