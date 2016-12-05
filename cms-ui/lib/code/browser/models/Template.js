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
        this.generateFieldNames();
        let json = Backbone.Model.prototype.toJSON.apply(this);
        return Object.assign({}, json, {
            tabs: this.get("tabs").toJSON(),
        });
    },

    generateFieldNames: function() {
        const nameIsUnique = this.nameIsUnique.bind(this);

        let fieldsWithNoName = [];
        this.get("tabs").forEach(function(tab) {
            fieldsWithNoName = fieldsWithNoName.concat(tab.get("fields").where({
                name: ""
            }));
        });
        fieldsWithNoName.forEach(function(field) {
            field.generateName();
            let name = field.get("name");
            let counter = 0;
            while (!nameIsUnique(name)) {
                counter++;
                field.set("name", name + counter);
            }
        });
    },

    nameIsUnique: function(name) {
        let unique = true;
        this.get("tabs").forEach(function(tab) {
            unique = unique && Boolean(tab.get("fields").where({
                name: name
            }).length === 1);
        });
        return unique;
    }

});

module.exports = Template;
