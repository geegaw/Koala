"use strict";

const Backbone = require("backbone");
const Field = require("../models/Role");

const Fields = Backbone.Collection.extend({
    model: Field,
});

module.exports = Fields;
