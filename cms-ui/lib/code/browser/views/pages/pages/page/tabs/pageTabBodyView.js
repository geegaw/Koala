"use strict";

const TabBodyView = require("../../../../elements/tabs/tabBodyView");

const PageTabBodyView = TabBodyView.extend({
    onRender: function() {
        const ContentsView = this.getOption("contentsView");
        this.getRegion("contents").show(new ContentsView({
            model: this.model,
            contentsModel: this.getOption("contentsModel"),
        }));
    },

});

module.exports = PageTabBodyView;
