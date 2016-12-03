"use strict";

const Marionette = require("backbone.marionette");

const Template = require("../../../../models/Template");
const Templates = require("../../../../collections/Templates");
const SelectView = require("../../../elements/form/selectView");
const TextView = require("../../../elements/form/textView");
const PageTabsView = require("./tabs/pageTabsView");
const PageTabView = require("./tabs/pageTabView");

const PageView = Marionette.View.extend({
    template: "pages/pages/pages-form",
    className: "pages--form",

    initialize: function() {
        this.pageTemplate = new Template();
        this.templates = new Templates();
        this.templates.fetch().then(this.renderTemplateDropdown.bind(this));
    },

    regions: {
        title: ".pages--form--title",
        template: ".pages--form--template",
        tabs: ".pages--form--tabs",
    },

    modelEvents: {
        "change:templateId": "updateTemplate",
    },

    onRender: function() {
        this.getRegion("title").show(new TextView({
            model: this.model,
            field: "title",
            placeholder: "title for the page",
            label: "Title",
            extraClass: "pages--form--title__input",
        }));

        this.updateTemplate();
    },

    renderTemplateDropdown: function() {
        this.getRegion("template").show(new SelectView({
            model: this.model,
            options: this.getTemplateOptions(),
            field: "templateId",
            label: "Template",
            extraClass: "pages--form--template__input",
        }));
    },

    renderTabs: function() {
        this.getRegion("tabs").show(new PageTabsView({
            collection: this.pageTemplate.get("tabs"),
            contentsModel: this.model,
            contentsView: PageTabView,
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

    updateTemplate: function() {
        if (this.model.get("templateId")) {
            this.pageTemplate = new Template({
                id: this.model.get("templateId"),
            });
            this.pageTemplate.fetch().then(this.renderTabs.bind(this));
        } else {
            this.pageTemplate = new Template();
            this.renderTabs();
        }
    },

});

module.exports = PageView;
