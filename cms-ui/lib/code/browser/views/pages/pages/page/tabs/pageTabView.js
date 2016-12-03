"use strict";

const Marionette = require("backbone.marionette");

const FieldsView = require("./../fields/fieldsView");

const PageTabView = Marionette.View.extend({
    template: "pages/pages/page-tab",
    className: "page--tab",

    regions: {
        fields: ".page--tab--fields",
    },

    onRender: function() {
        this.getRegion("fields").show(new FieldsView({
            collection: this.model.get("fields"),
            childViewOptions: {
                contentsModel: this.getOption("contentsModel"),
            },
        }));
    },

});

module.exports = PageTabView;
