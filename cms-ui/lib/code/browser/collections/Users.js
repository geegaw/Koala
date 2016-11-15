"use strict";

const Backbone = require("backbone");
const User = require("../models/User");

const Roles = Backbone.Collection.extend({
    model: User,
    url: "/api/search/user",
});

module.exports = Roles;
