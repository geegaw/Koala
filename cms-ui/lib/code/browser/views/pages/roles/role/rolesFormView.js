"use strict";

const FormLayoutView = require("../../../elements/form/formLayoutView");
const RoleView = require("./roleView");

const RolesFormView = FormLayoutView.extend({

    onRender: function() {
        FormLayoutView.prototype.onRender.apply(this);
        this.getRegion("form").show(new RoleView({
            model: this.model,
        }));
    },

});

module.exports = RolesFormView;
