"use strict";

const Backbone = require("backbone");
const Page = require("../models/Page");

const Pages = Backbone.Collection.extend({
    model: Page,
    url: "/api/search/page",
});

module.exports = Pages;
