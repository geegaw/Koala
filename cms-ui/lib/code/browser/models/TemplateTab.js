"use strict";

const Tab = require("./Tab");
const Fields = require("../collections/Fields");

const TemplateTab = Tab.extend({
    defaults: function() {
        return {
            fields: new Fields(),
        };
    },

    parse: function(data) {
        data.fields = new Fields(data.fields, {
            parse: true
        });
        return data;
    },

    toJSON: function() {
        let json = Tab.prototype.toJSON.apply(this);
        return Object.assign({}, json, {
            fields: this.get("fields").toJSON(),
        });
    },

});

module.exports = TemplateTab;
