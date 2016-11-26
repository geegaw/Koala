"use strict";

const Backbone = require("backbone");
const TemplateTabs = require("../collections/TemplateTabs");

const Template = Backbone.Model.extend({

    defaults: {
        tabs: new TemplateTabs({
            name: "main"
        }, {
            parse: true
        }),
    },

    urlRoot: "/api/model/template",

    validate: function(attrs) {
        if (!attrs.name || attrs.name.trim().length === 0) {
            return "name can not be empty";
        }
    },

    parse: function(data) {
        data.tabs = new TemplateTabs(data.tabs || {}, {
            parse: true
        });
        return data;
    },

    toJSON: function() {
        let json = Backbone.Model.prototype.toJSON.apply(this);
        return Object.assign({}, json, {
            tabs: this.get("tabs").toJSON(),
        });
    },

});

module.exports = Template;
