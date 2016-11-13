"use strict";

const Backbone = require("backbone");
const Role = require("../models/Role");

const Roles = Backbone.Collection.extend({
    model: Role,
    url: "/api/search/role",
});

module.exports = Roles;
