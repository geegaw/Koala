"use strict";

const express = require("express");
const ModelController = require("./controller");

let ModelRouter = express.Router();
let modelController = new ModelController();

ModelRouter.get("/:model/:id", function(req, res){
    modelController.get(res, req.model, req.id, req.session.userId);
});

ModelRouter.post("/:model", function(req, res){
    modelController.post(res, req.model, req.body, req.session.userId);
});

ModelRouter.put("/:model/:id", function(req, res){
    modelController.put(res, req.model, req.id,req.body,  req.session.userId);
});

ModelRouter.delete("/:model/:id", function(req, res){
    modelController.delete(res, req.model, req.id, req.session.userId);
});

module.exports = ModelRouter;
