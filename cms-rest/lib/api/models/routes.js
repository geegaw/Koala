"use strict";

const express = require("express");
const ModelController = require("./controller");

let ModelRouter = express.Router();
let modelController = new ModelController();

ModelRouter.get("/:model/:id", function(req, res){
    modelController.get(res, req.params.model, req.params.id, req.session.user);
});

ModelRouter.post("/:model", function(req, res){
    modelController.post(res, req.params.model, req.body, req.session.user);
});

ModelRouter.put("/:model/:id", function(req, res){
    modelController.put(res, req.params.model, req.params.id,req.body, req.session.user);
});

ModelRouter.delete("/:model/:id", function(req, res){
    modelController.delete(res, req.params.model, req.params.id, req.session.user);
});

module.exports = ModelRouter;
