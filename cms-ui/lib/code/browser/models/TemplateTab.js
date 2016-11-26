"use strict";

const Tab = require("./Tab");
const Fields = require("../collections/Fields");

const TemplateTab = Tab.extend({
    defaults: function() {
        return {
            fields: new Fields(),
        };
    },
});

module.exports = TemplateTab;
