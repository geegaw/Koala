"use strict";

const FormLayoutView = require("../../../elements/form/formLayoutView");
const TemplateView = require("./templateView");

const TemplatesFormView = FormLayoutView.extend({

    onRender: function() {
        FormLayoutView.prototype.onRender.apply(this);
        this.getRegion("form").show(new TemplateView({
            model: this.model,
        }));
    },

});

module.exports = TemplatesFormView;
