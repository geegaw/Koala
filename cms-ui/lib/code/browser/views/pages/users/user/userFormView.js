"use strict";

const FormLayoutView = require("../../../elements/form/formLayoutView");
const UserView = require("./userView");

const UsersFormView = FormLayoutView.extend({

    onRender: function() {
        FormLayoutView.prototype.onRender.apply(this);
        this.getRegion("form").show(new UserView({
            model: this.model,
        }));
    },

});

module.exports = UsersFormView;
