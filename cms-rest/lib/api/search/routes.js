"use strict";

const express = require("express");
const SearchController = require("./controller");

let SearchRouter = express.Router();
let searchController = new SearchController();

SearchRouter.get("/:model", function(req, res){
    searchController.get(res, req.params.model, req.body, req.session.user);
});

module.exports = SearchRouter;
