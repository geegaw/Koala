"use strict";

const Backbone = require("backbone");
const Field = require("../models/Field");

const Fields = Backbone.Collection.extend({
    model: Field,
});

module.exports = Fields;
