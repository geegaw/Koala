"use strict";

const Tabs = require("./Tabs");
const TemplateTab = require("../models/TemplateTab");

const TemplateTabs = Tabs.extend({
    model: TemplateTab,
});

module.exports = TemplateTabs;
