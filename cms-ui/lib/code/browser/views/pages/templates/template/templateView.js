"use strict";

const Marionette = require("backbone.marionette");

const TabsView = require("../../../elements/tabs/tabsView");
const TextView = require("../../../elements/form/textView");
const TemplateTabView = require("./templateTabView");
const TemplateTabAddView = require("./templateTabAddView");

const TemplateView = Marionette.View.extend({
    template: "pages/templates/templates-form",
    className: "templates--form",
    regions: {
        name: ".templates--form--name",
        tabs: ".templates--tabs",
        newTab: ".templates--new-tab",
    },

    onRender: function() {
        this.getRegion("name").show(new TextView({
            model: this.model,
            field: "name",
            placeholder: "name for the template",
            label: "Name",
            extraClass: "templates--form--name__input",
        }));

        this.getRegion("tabs").show(new TabsView({
            collection: this.model.get("tabs"),
            contentsView: TemplateTabView,
        }));

        this.getRegion("newTab").show(new TemplateTabAddView());
    },

    onChildviewAddTab: function(tab) {
        this.model.get("tabs").add(tab);
    },

});

module.exports = TemplateView;
