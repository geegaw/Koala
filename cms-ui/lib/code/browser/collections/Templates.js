"use strict";

const Backbone = require("backbone");
const Template = require("../models/Template");

const Templates = Backbone.Collection.extend({
    model: Template,
    url: "/api/search/template",
});

module.exports = Templates;
