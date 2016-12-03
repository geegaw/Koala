"use strict";

const Marionette = require("backbone.marionette");

const TabsView = require("../../../../elements/tabs/tabsView");
const PageTabBodyView = require("./pageTabBodyView");

const PageTabsView = TabsView.extend({
    renderBodies: function() {
        this.getRegion("bodies").show(new Marionette.CollectionView({
            childView: PageTabBodyView,
            collection: this.collection,
            childViewOptions: {
                contentsView: this.getOption("contentsView"),
                contentsModel: this.getOption("contentsModel"),
            },
        }));
    },
});

module.exports = PageTabsView;
