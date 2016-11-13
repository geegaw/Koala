"use strict";

const express = require("express");
const Responses = require("../helpers/responses");

let ApiRouter = express.Router();

ApiRouter.use("/model", require("./models/routes"));

ApiRouter.get("/*", function(req, res){
    Responses.pageNotFound(res);
});
ApiRouter.post("/*", function(req, res){
    Responses.pageNotFound(res);
});
ApiRouter.put("/*", function(req, res){
    Responses.pageNotFound(res);
});
ApiRouter.delete("/*", function(req, res){
    Responses.pageNotFound(res);
});

module.exports = ApiRouter;
