"use strict";

const Marionette = require("backbone.marionette");

const Templates = require("../../../../collections/Templates");
const SelectView = require("../../../elements/form/selectView");
const TextView = require("../../../elements/form/textView");

const PageView = Marionette.View.extend({
    template: "pages/pages/pages-form",
    className: "pages--form",

    initialize: function() {
        this.templates = new Templates();
        this.templates.fetch().then(this.render.bind(this));
    },

    regions: {
        title: ".pages--form--title",
        template: ".pages--form--template",
    },

    onRender: function() {
        this.getRegion("title").show(new TextView({
            model: this.model,
            field: "title",
            placeholder: "title for the page",
            label: "Title",
            extraClass: "pages--form--title__input",
        }));

        this.getRegion("template").show(new SelectView({
            model: this.model,
            options: this.getTemplateOptions(),
            field: "templateId",
            label: "Template",
            extraClass: "pages--form--template__input",
        }));
    },

    getTemplateOptions: function() {
        let formatted = [];
        this.templates.each(function(template) {
            formatted.push({
                value: template.id,
                label: template.get("name"),
            });
        });
        return formatted;
    },

});

module.exports = PageView;
