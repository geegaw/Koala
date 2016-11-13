"use strict";

const Backbone = require("backbone");
const Permission = require("../models/Permission");

const Permissions = Backbone.Collection.extend({
    model: Permission,
});

module.exports = Permissions;
