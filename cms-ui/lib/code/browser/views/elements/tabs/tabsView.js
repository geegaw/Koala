"use strict";

const Marionette = require("backbone.marionette");

const TabLabelView = require("./tabLabelView");
const TabBodyView = require("./tabBodyView");

const TabsView = Marionette.View.extend({
    className: "tabs",
    template: "elements/tabs/tabs",

    regions: {
        labels: ".tabs--labels",
        bodies: ".tabs--bodies",
    },

    events: {
        "click .tab--label": "changeTab",
    },

    onRender: function() {
        this.renderLabels();
        this.renderBodies();
    },

    renderLabels: function() {
        this.getRegion("labels").show(new Marionette.CollectionView({
            className: "tabs--labels--labels",
            childView: TabLabelView,
            collection: this.collection,
        }));
    },

    renderBodies: function() {
        this.getRegion("bodies").show(new Marionette.CollectionView({
            childView: TabBodyView,
            collection: this.collection,
            childViewOptions: {
                contentsView: this.getOption("contentsView"),
            },
        }));
    },

    onAttach: function() {
        this.$(".tab--label:first").addClass("active");
        this.$(".tab--body:first").show();
    },

    onChildviewChangeTab: function(model) {
        this.$(".tab--label.active").removeClass("active");
        this.$(".tab--body:visible").hide();
        this.getRegion("bodies").currentView.children.findByModel(model).$el.show();
    },

});

module.exports = TabsView;
