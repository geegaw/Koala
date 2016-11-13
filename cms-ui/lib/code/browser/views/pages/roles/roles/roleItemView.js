"use strict";

const Marionette = require("backbone.marionette");
const ConfirmationView = require("../../../elements/confirmationView");

const RoleItemView = Marionette.View.extend({
    template: "pages/roles/role-item",
    className: "role-item search-item",

    ui: {
        delete: ".search-delete",
    },

    events: {
        "click @ui.delete": "delete",
    },

    delete: function() {
        let confirmation = new ConfirmationView({
            question: "Are you sure you want to delete " + (this.model.get("name") || "me") + "?",
        });
        this.listenTo(confirmation, "user:confirmed", this.deleteModel.bind(this));
        confirmation.render();
        this.$el.append(confirmation.$el);
    },

    deleteModel: function() {
        this.getUI("delete").addClass("loading");

        let self = this;
        this.model.destroy().fail(this.notifyError.bind(this));
    },

    notifyError: function(jqXHR, textStatus, errorThrown){
        this.getUI("delete").removelass("loading");
        console.error(jqXHR, textStatus, errorThrown);
    },

});

module.exports = RoleItemView;
