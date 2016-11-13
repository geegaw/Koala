"use strict";

const express = require("express");
const Responses = require("../helpers/responses");

let ApiRouter = express.Router();

ApiRouter.use("/model", require("./models/routes"));

ApiRouter.get("/*", function(){
    Responses.pageNotFound();
});
ApiRouter.post("/*", function(){
    Responses.pageNotFound();
});
ApiRouter.put("/*", function(){
    Responses.pageNotFound();
});
ApiRouter.delete("/*", function(){
    Responses.pageNotFound();
});

module.exports = ApiRouter;
