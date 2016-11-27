"use strict";

const FormLayoutView = require("../../../elements/form/formLayoutView");
const PageView = require("./pageView");

const PagesFormView = FormLayoutView.extend({

    onRender: function() {
        FormLayoutView.prototype.onRender.apply(this);
        this.getRegion("form").show(new PageView({
            model: this.model,
        }));
    },

});

module.exports = PagesFormView;
