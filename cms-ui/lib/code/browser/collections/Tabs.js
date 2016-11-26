"use strict";

const Backbone = require("backbone");
const Tab = require("../models/Tab");

const Tabs = Backbone.Collection.extend({
    model: Tab,
});

module.exports = Tabs;
