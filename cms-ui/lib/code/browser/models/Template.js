"use strict";

const Backbone = require("backbone");

const Template = Backbone.Model.extend({

    defaults: {
        tabs: new Backbone.Collection({
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

});

module.exports = Template;
